import re
import uuid
from collections.abc import Mapping

from flask import Flask, Response, g, has_request_context, request

CORRELATION_ID_HEADER = "X-Request-ID"
ALT_CORRELATION_ID_HEADER = "X-Correlation-ID"

_SAFE_CORRELATION_ID = re.compile(r"^[A-Za-z0-9._:-]{1,128}$")


def generate_correlation_id() -> str:
    return uuid.uuid4().hex


def normalize_correlation_id(value: str | None) -> str | None:
    if value is None:
        return None

    candidate = value.strip()
    if not candidate or not _SAFE_CORRELATION_ID.fullmatch(candidate):
        return None
    return candidate


def resolve_correlation_id(headers: Mapping[str, str] | None = None) -> str:
    source = headers or {}
    provided = normalize_correlation_id(
        source.get(CORRELATION_ID_HEADER) or source.get(ALT_CORRELATION_ID_HEADER)
    )
    return provided or generate_correlation_id()


def get_current_correlation_id() -> str | None:
    if not has_request_context():
        return None
    return getattr(g, "correlation_id", None)


def register_correlation_handlers(app: Flask) -> None:
    @app.before_request
    def attach_correlation_id() -> None:
        g.correlation_id = resolve_correlation_id(request.headers)

    @app.after_request
    def add_correlation_header(response: Response) -> Response:
        correlation_id = get_current_correlation_id()
        if correlation_id:
            response.headers[CORRELATION_ID_HEADER] = correlation_id
        return response
