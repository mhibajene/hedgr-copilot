from .errors import DomainErrorCode, error_response


def require_json_fields(payload: dict, fields: list[str]):
    missing = [f for f in fields if f not in payload]
    if missing:
        return error_response(
            DomainErrorCode.VALIDATION_ERROR, f"Missing fields: {', '.join(missing)}", 400
        )
    return None
