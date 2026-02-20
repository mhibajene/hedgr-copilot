from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException


def error_response(code: str, message: str, status: int):
    return jsonify({"error": {"code": code, "message": message}}), status


def register_error_handlers(app: Flask):
    @app.errorhandler(HTTPException)
    def handle_http(e: HTTPException):
        return error_response("http_error", e.description, e.code or 500)

    @app.errorhandler(Exception)
    def handle_any(_e: Exception):
        return error_response("internal_error", "Unexpected server error", 500)
