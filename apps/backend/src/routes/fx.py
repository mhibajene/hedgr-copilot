import os
import time
from flask import Blueprint, jsonify, request
from ..lib.errors import error_response

bp = Blueprint("fx", __name__)


@bp.get("/fx/latest")
def fx_latest():
    pair = request.args.get("pair")
    if not pair:
        return error_response("validation_error", "pair is required", 400)

    stub_mode = os.environ.get("STUB_MODE", "true").lower() == "true"
    if stub_mode:
        p = pair.upper()
        rate = 20.0 if p == "USDZMW" else 1.0
        return jsonify({"pair": p, "rate": rate, "ts": int(time.time())})

    return error_response("not_implemented", "live FX not enabled", 501)
