import os
from .app import create_app

port = int(os.environ.get("PORT", "5050"))
app = create_app()
app.run(host="0.0.0.0", port=port)
