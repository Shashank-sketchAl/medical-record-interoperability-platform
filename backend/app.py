from flask import Flask, jsonify
from flask_cors import CORS
from routes.api import api_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(api_bp, url_prefix='/api')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "Medical Record Interoperability Platform"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
