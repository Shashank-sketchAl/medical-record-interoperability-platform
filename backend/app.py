from flask import Flask, jsonify
from flask_cors import CORS
from routes.api import api_bp
from routes.auth_routes import auth_bp
from services.auth_service import bcrypt

app = Flask(__name__)
CORS(app)
bcrypt.init_app(app)

app.register_blueprint(api_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "Medical Record Interoperability Platform"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
