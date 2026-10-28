from flask import current_app, request
from werkzeug.exceptions import LengthRequired, RequestEntityTooLarge

TRANSACTION_BODY_LIMIT = 4096


def read_limited_json(limit: int = TRANSACTION_BODY_LIMIT):
    """Count request bytes before JSON decoding; never parse a partial body."""
    length = request.content_length
    if length is not None and length > limit:
        raise RequestEntityTooLarge()
    if length is None and not request.environ.get("wsgi.input_terminated"):
        # WSGI cannot safely delimit this body. Do not treat it as empty JSON.
        raise LengthRequired()

    chunks = []
    size = 0
    while True:
        chunk = request.stream.read(min(8192, limit + 1 - size))
        if not chunk:
            break
        size += len(chunk)
        if size > limit:
            raise RequestEntityTooLarge()
        chunks.append(chunk)

    if not request.is_json:
        return None
    try:
        return current_app.json.loads(b"".join(chunks))
    except ValueError:
        return None
