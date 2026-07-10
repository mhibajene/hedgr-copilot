from src.lib.correlation import normalize_correlation_id, resolve_correlation_id
from src.lib.errors import DomainErrorCode, error_response


def test_correlation_id_normalization_accepts_safe_ids():
    assert normalize_correlation_id(" req-123 ") == "req-123"
    assert normalize_correlation_id("abc.DEF_123:456") == "abc.DEF_123:456"


def test_correlation_id_normalization_rejects_missing_or_unsafe_ids():
    assert normalize_correlation_id(None) is None
    assert normalize_correlation_id("") is None
    assert normalize_correlation_id("../provider-secret") is None
    assert normalize_correlation_id("a" * 129) is None


def test_resolve_correlation_id_prefers_safe_request_header():
    assert resolve_correlation_id({"X-Request-ID": "client-req-1"}) == "client-req-1"


def test_error_response_can_include_explicit_correlation_id():
    from src.app import create_app

    app = create_app()
    with app.app_context():
        response, status = error_response(
            DomainErrorCode.UNSUPPORTED_EXECUTION,
            "Unsupported execution path",
            409,
            correlation_id="test-correlation",
        )

    assert status == 409
    assert response.get_json() == {
        "error": {
            "code": "unsupported_execution",
            "message": "Unsupported execution path",
            "correlation_id": "test-correlation",
        }
    }


def test_route_errors_echo_request_correlation_id(monkeypatch):
    monkeypatch.setenv("STUB_MODE", "true")
    from src.app import create_app

    app = create_app()
    client = app.test_client()

    response = client.post(
        "/v1/deposits",
        json={},
        headers={"X-Request-ID": "req-validation-1"},
    )
    payload = response.get_json()

    assert response.status_code == 400
    assert response.headers["X-Request-ID"] == "req-validation-1"
    assert payload["error"]["code"] == "validation_error"
    assert payload["error"]["correlation_id"] == "req-validation-1"
