# Hedgr Backend (Stub Contracts)

## Execution posture

The backend remains stub-first and execution-neutral. `STUB_MODE=true` is the
local and CI-safe default. Live deposits, withdrawals, provider adapters,
custody, settlement, conversion, and customer-money movement remain denied
outside separately authorized repo governance.

## Domain errors and request correlation

Backend domain errors use the shared taxonomy in `src/lib/errors.py`.
Request correlation is handled by `src/lib/correlation.py` with `X-Request-ID`
or a generated request id. Error envelopes include `error.correlation_id` when
available, and responses echo `X-Request-ID`.

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
