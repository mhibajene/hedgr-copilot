import os
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


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5050"))
    app = create_app()
    app.run(host="0.0.0.0", port=port)
