import pytest

from src.app import _parse_args, _resolve_port


def test_cli_port_wins():
    assert _resolve_port(8080) == 8080


def test_env_port_fallback(monkeypatch):
    monkeypatch.setenv("PORT", "9090")
    assert _resolve_port(None) == 9090


def test_default_port(monkeypatch):
    monkeypatch.delenv("PORT", raising=False)
    assert _resolve_port(None) == 5050


def test_invalid_port_exits():
    with pytest.raises(SystemExit) as exc:
        _resolve_port(99999)
    assert exc.value.code == 2


def test_parse_args_port():
    args = _parse_args(["--port", "7070"])
    assert args.port == 7070


def test_parse_args_host():
    args = _parse_args(["--host", "127.0.0.1"])
    assert args.host == "127.0.0.1"


def test_parse_args_defaults():
    args = _parse_args([])
    assert args.port is None
    assert args.host == "0.0.0.0"
