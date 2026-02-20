import os
import uuid
import time
from flask import Blueprint, jsonify, request

from ..lib.errors import error_response
from ..lib.validation import require_json_fields
from ..lib.store import get_by_ref, put

bp = Blueprint("tx", __name__)


def _idempotent_create(kind: str, txn_ref: str):
    existing = get_by_ref(txn_ref)
    if existing:
        return existing

    record = {
        "id": f"{kind}_{uuid.uuid4().hex[:12]}",
        "txn_ref": txn_ref,
        "kind": kind,
        "status": "pending",
        "ts": int(time.time()),
    }
    return put(txn_ref, record)


@bp.post("/deposits")
def deposits():
    if os.environ.get("STUB_MODE", "true").lower() != "true":
        return error_response("not_implemented", "live deposits not enabled", 501)

    payload = request.get_json(silent=True) or {}
    err = require_json_fields(payload, ["txn_ref"])
    if err:
        return err

    txn_ref = str(payload["txn_ref"])
    rec = _idempotent_create("deposit", txn_ref)
    return jsonify({"depositId": rec["id"], "txn_ref": txn_ref}), 202


@bp.post("/withdrawals")
def withdrawals():
    if os.environ.get("STUB_MODE", "true").lower() != "true":
        return error_response("not_implemented", "live withdrawals not enabled", 501)

    payload = request.get_json(silent=True) or {}
    err = require_json_fields(payload, ["txn_ref"])
    if err:
        return err

    txn_ref = str(payload["txn_ref"])
    rec = _idempotent_create("withdrawal", txn_ref)
    return jsonify({"withdrawalId": rec["id"], "txn_ref": txn_ref}), 202
