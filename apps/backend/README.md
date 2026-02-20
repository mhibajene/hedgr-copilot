# Hedgr Backend (Stub Contracts)

## Run (local)
```bash
python -m venv .venv && source .venv/bin/activate
pip install -e ".[test]"
STUB_MODE=true PORT=5050 python -m src.app
```

## Test
```bash
pytest
```
