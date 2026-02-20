def test_deposit_idempotent(monkeypatch):
    monkeypatch.setenv("STUB_MODE", "true")
    from src.app import create_app

    app = create_app()
    c = app.test_client()

    payload = {"txn_ref": "abc-123"}
    r1 = c.post("/v1/deposits", json=payload).get_json()
    r2 = c.post("/v1/deposits", json=payload).get_json()
    assert r1["depositId"] == r2["depositId"]
    assert r1["txn_ref"] == r2["txn_ref"]
