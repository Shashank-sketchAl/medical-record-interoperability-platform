from flask import Blueprint, request, jsonify
from services.auth_service import register_user, login_user, get_user_profile, update_user_profile

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    phone = data.get('phone')
    full_name = data.get('full_name')
    
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
        
    response, status = register_user(username, password, email, phone, full_name)
    return jsonify(response), status

@auth_bp.route('/profile/<username>', methods=['GET'])
def get_profile(username):
    response, status = get_user_profile(username)
    return jsonify(response), status

@auth_bp.route('/profile/<username>', methods=['PUT'])
def update_profile(username):
    data = request.json
    response, status = update_user_profile(username, data)
    return jsonify(response), status

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
        
    response, status = login_user(username, password)
    return jsonify(response), status
