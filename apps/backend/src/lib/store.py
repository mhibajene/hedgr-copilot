_TX: dict[str, dict] = {}


def get_by_ref(txn_ref: str):
    return _TX.get(txn_ref)


def put(txn_ref: str, record: dict):
    _TX[txn_ref] = record
    return record
