import jwt
import datetime
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
SECRET_KEY = "supersecretkey" # In production, use os.environ.get('SECRET_KEY')

# In-memory user store for prototype
users_db = {} 

def register_user(username, password, email=None, phone=None, full_name=None, role="doctor"):
    if username in users_db:
        return {"error": "User already exists"}, 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users_db[username] = {
        "password": hashed_password,
        "email": email,
        "phone": phone,
        "full_name": full_name,
        "role": role,
        "profile": {  # Default empty profile
            "age": "",
            "weight": "",
            "height": "",
            "diseases": []
        }
    }
    return {"message": "User created successfully"}, 201

def get_user_profile(username):
    user = users_db.get(username)
    if not user:
        return {"error": "User not found"}, 404
    
    # Return safe data (exclude password)
    return {
        "username": username,
        "full_name": user.get("full_name"),
        "email": user.get("email"),
        "phone": user.get("phone"),
        "role": user.get("role"),
        "profile": user.get("profile", {})
    }, 200

def update_user_profile(username, data):
    user = users_db.get(username)
    if not user:
        return {"error": "User not found"}, 404
    
    # Update profile fields if provided
    if "profile" in data:
        user["profile"].update(data["profile"])
        
    return {"message": "Profile updated successfully", "profile": user["profile"]}, 200

def login_user(username, password):
    user = users_db.get(username)
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return {"error": "Invalid credentials"}, 401
    
    token = jwt.encode({
        'user': username,
        'role': user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, SECRET_KEY, algorithm="HS256")
    
    return {"token": token, "username": username, "role": user['role']}, 200
