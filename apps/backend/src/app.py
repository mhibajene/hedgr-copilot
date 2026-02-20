import argparse
import os
import sys
from typing import Optional, Sequence

from flask import Flask
from flask_cors import CORS

from .routes.health import bp as health_bp
from .routes.fx import bp as fx_bp
from .routes.tx import bp as tx_bp
from .lib.errors import register_error_handlers


def create_app() -> Flask:
    app = Flask(__name__)

    CORS(app, resources={r"/v1/*": {"origins": "*"}})

    register_error_handlers(app)

    app.register_blueprint(health_bp, url_prefix="/v1")
    app.register_blueprint(fx_bp, url_prefix="/v1")
    app.register_blueprint(tx_bp, url_prefix="/v1")

    return app


def _parse_args(argv: Optional[Sequence[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Hedgr backend server")
    parser.add_argument("--port", type=int, default=None, help="Port to listen on")
    parser.add_argument("--host", type=str, default="0.0.0.0", help="Host to bind to")
    return parser.parse_args(argv)


def _resolve_port(cli_port: Optional[int]) -> int:
    """Return a validated port: CLI flag > PORT env > 5050 default."""
    if cli_port is not None:
        port = cli_port
    else:
        raw = os.environ.get("PORT", "5050")
        try:
            port = int(raw)
        except ValueError:
            print(f"Error: PORT must be an integer, got '{raw}'", file=sys.stderr)
            raise SystemExit(2)
    if not (1 <= port <= 65535):
        print(f"Error: port must be 1-65535, got {port}", file=sys.stderr)
        raise SystemExit(2)
    return port


if __name__ == "__main__":
    args = _parse_args()
    port = _resolve_port(args.port)
    app = create_app()
    app.run(host=args.host, port=port)
