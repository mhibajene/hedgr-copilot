from enum import StrEnum

from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException

from .correlation import get_current_correlation_id


class DomainErrorCode(StrEnum):
    VALIDATION_ERROR = "validation_error"
    NOT_IMPLEMENTED = "not_implemented"
    HTTP_ERROR = "http_error"
    INTERNAL_ERROR = "internal_error"
    UNSUPPORTED_EXECUTION = "unsupported_execution"
    UNKNOWN_STATE = "unknown_state"


def error_response(
    code: DomainErrorCode | str,
    message: str,
    status: int,
    correlation_id: str | None = None,
):
    request_id = correlation_id or get_current_correlation_id()
    payload = {"error": {"code": str(code), "message": message}}
    if request_id:
        payload["error"]["correlation_id"] = request_id
    return jsonify(payload), status


def register_error_handlers(app: Flask):
    @app.errorhandler(HTTPException)
    def handle_http(e: HTTPException):
        return error_response(DomainErrorCode.HTTP_ERROR, e.description, e.code or 500)

    @app.errorhandler(Exception)
    def handle_any(_e: Exception):
        return error_response(
            DomainErrorCode.INTERNAL_ERROR, "Unexpected server error", 500
        )
