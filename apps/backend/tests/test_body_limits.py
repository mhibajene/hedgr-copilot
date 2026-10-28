import io
import json

import pytest
from src.app import create_app

LIMIT = 4096
PATHS = ["/v1/deposits", "/v1/withdrawals"]


class CountedInput(io.BytesIO):
    def __init__(self, body):
        super().__init__(body)
        self.bytes_read = 0
        self.read_sizes = []

    def read(self, size=-1):
        self.read_sizes.append(size)
        data = super().read(size)
        self.bytes_read += len(data)
        return data

    def readinto(self, target):
        self.read_sizes.append(len(target))
        count = super().readinto(target)
        self.bytes_read += count
        return count


@pytest.fixture
def app(monkeypatch):
    monkeypatch.setenv("STUB_MODE", "true")
    monkeypatch.setattr("src.lib.store._TX", {})
    return create_app()


def send(app, path, body, terminated, headers=None):
    stream = CountedInput(body)
    env = {"wsgi.input": stream, "CONTENT_LENGTH": str(len(body))}
    if terminated:
        env.update({"CONTENT_LENGTH": None, "wsgi.input_terminated": True})
    response = app.test_client().post(
        path, content_type="application/json", environ_overrides=env, headers=headers
    )
    return response, stream


def forbid_parsing_and_storage(monkeypatch, app):
    def forbidden(*args, **kwargs):
        raise AssertionError("Rejected input reached JSON decoding or storage")

    monkeypatch.setattr(app.json, "loads", forbidden)
    monkeypatch.setattr("src.routes.tx._idempotent_create", forbidden)


@pytest.mark.parametrize("path", PATHS)
@pytest.mark.parametrize("terminated", [False, True])
@pytest.mark.parametrize("tail", [b" ", b"!", b"x" * (LIMIT * 4)])
def test_oversize_before_json_or_store(app, monkeypatch, path, terminated, tail):
    forbid_parsing_and_storage(monkeypatch, app)
    prefix = b'{"txn_ref":"prefix"}'.ljust(LIMIT, b" ")
    response, stream = send(
        app, path, prefix + tail, terminated, {"X-Request-ID": "body-limit-test"}
    )
    assert response.status_code == 413
    if terminated:
        assert stream.bytes_read == LIMIT + 1
        assert all(0 < size <= LIMIT + 1 for size in stream.read_sizes)
    else:
        assert stream.bytes_read == 0
        assert stream.read_sizes == []
    assert response.headers["X-Request-ID"] == "body-limit-test"
    error = json.loads(response.data)["error"]
    assert error["code"] == "http_error"
    assert error["correlation_id"] == "body-limit-test"


@pytest.mark.parametrize("path", PATHS)
@pytest.mark.parametrize("terminated", [False, True])
@pytest.mark.parametrize("size", [LIMIT - 1, LIMIT])
@pytest.mark.parametrize("utf8", [False, True])
def test_near_limit_preserves_full_request(app, path, terminated, size, utf8):
    overhead = len(b'{"txn_ref":"-TAIL"}')
    remaining = size - overhead
    ref = (("é" * (remaining // 2) + "x" * (remaining % 2)) if utf8 else "x" * remaining) + "-TAIL"
    body = json.dumps({"txn_ref": ref}, ensure_ascii=False, separators=(",", ":")).encode()
    assert len(body) == size
    response, stream = send(app, path, body, terminated)
    assert response.status_code == 202
    assert response.get_json()["txn_ref"] == ref
    assert stream.bytes_read == size
    from src.lib.store import get_by_ref

    assert get_by_ref(ref)["txn_ref"] == ref


@pytest.mark.parametrize("path", PATHS)
def test_unsafe_undelimited_body_is_rejected_without_read(app, monkeypatch, path):
    forbid_parsing_and_storage(monkeypatch, app)
    stream = CountedInput(b'{"txn_ref":"undelimited"}')
    response = app.test_client().post(
        path, content_type="application/json",
        environ_overrides={"CONTENT_LENGTH": None, "wsgi.input": stream},
    )
    assert response.status_code == 411
    assert stream.bytes_read == 0
    assert stream.read_sizes == []
    assert json.loads(response.data)["error"]["code"] == "http_error"


@pytest.mark.parametrize("path", PATHS)
@pytest.mark.parametrize("terminated", [False, True])
def test_utf8_excess_is_rejected_before_decode(app, monkeypatch, path, terminated):
    forbid_parsing_and_storage(monkeypatch, app)
    text = '{"txn_ref":"' + "é" * (LIMIT // 2) + '"}'
    assert len(text) < LIMIT < len(text.encode())
    response, stream = send(app, path, text.encode(), terminated)
    assert response.status_code == 413
    assert stream.bytes_read == (LIMIT + 1 if terminated else 0)


@pytest.mark.parametrize("path", PATHS)
@pytest.mark.parametrize("terminated", [False, True])
def test_malformed_json_compatibility(app, path, terminated):
    response, _ = send(app, path, b"{", terminated)
    assert response.status_code == 400
    assert response.get_json()["error"]["code"] == "validation_error"


@pytest.mark.parametrize("path", PATHS)
@pytest.mark.parametrize("terminated", [False, True])
def test_idempotency_at_exact_cap(app, path, terminated):
    body = b'{"txn_ref":"idempotent-tail"}'.ljust(LIMIT, b" ")
    first, _ = send(app, path, body, terminated)
    second, _ = send(app, path, body, terminated)
    assert first.status_code == second.status_code == 202
    key = "depositId" if path.endswith("deposits") else "withdrawalId"
    assert first.get_json()[key] == second.get_json()[key]


@pytest.mark.parametrize("path", PATHS)
@pytest.mark.parametrize("terminated", [False, True])
def test_nonstub_501_precedes_any_body_read(app, monkeypatch, path, terminated):
    monkeypatch.setenv("STUB_MODE", "false")
    forbid_parsing_and_storage(monkeypatch, app)
    response, stream = send(app, path, b"x" * (LIMIT + 1), terminated)
    assert response.status_code == 501
    assert stream.bytes_read == 0
    assert stream.read_sizes == []


@pytest.mark.parametrize("path", ["/v1/health", "/v1/fx/latest?pair=USDZMW"])
def test_get_controls_do_not_read_body(app, monkeypatch, path):
    forbid_parsing_and_storage(monkeypatch, app)
    stream = CountedInput(b"x" * (LIMIT + 1))
    response = app.test_client().get(
        path, content_type="application/json",
        environ_overrides={"wsgi.input": stream, "CONTENT_LENGTH": str(LIMIT + 1)},
    )
    assert response.status_code == 200
    assert stream.bytes_read == 0
    assert stream.read_sizes == []
