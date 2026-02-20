def test_fx_latest_deterministic(monkeypatch):
    monkeypatch.setenv("STUB_MODE", "true")
    from src.app import create_app

    app = create_app()
    c = app.test_client()

    res = c.get("/v1/fx/latest?pair=USDZMW")
    assert res.status_code == 200
    j = res.get_json()
    assert j["pair"] == "USDZMW"
    assert j["rate"] == 20.0
    assert isinstance(j["ts"], int)
