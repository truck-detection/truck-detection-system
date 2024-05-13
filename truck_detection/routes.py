from flask import Blueprint, request, jsonify, current_app, render_template_string
from sqlalchemy import text
from flask_login import login_user, logout_user, login_required, UserMixin, current_user
from flask_mail import Message
from truck_detection import login_manager, mail
import secrets, string

# 블루프린트 생성
user_routes = Blueprint('user_routes', __name__)

class User(UserMixin):
        def __init__(self, user_id, name, email):
            self.id = user_id
            self.name = name
            self.email = email

@login_manager.user_loader
def load_user(user_id):
    if user_id is not None:
        conn = user_routes.database.connect()
        result = conn.execute(text("""
            SELECT managerID, name, email, confirmation_code FROM manager WHERE ManagerID = :user_id
        """), {'user_id': user_id})
        user = result.fetchone()
        conn.close()

        if user:
            user_id, user_name, _, user_email = user
            return User(user_id, user_name, user_email)
        else:
            return None
    else:
        return None

@user_routes.route('/user/sign-up', methods = ['POST'])
def sign_up():
    user_data = request.json
    email = user_data.get('email')
    password = user_data.get('password')
    confirm_password = user_data.get('confirm_password')
    manager_id = user_data.get('managerID','')
    name = user_data.get('name', '')

    # 이메일 중복 확인
    conn = user_routes.database.connect()
    result = conn.execute(text("""
        SELECT email FROM manager WHERE email = :email
    """), {'email': email})
    existing_user = result.fetchone()

    if existing_user:
        return jsonify({"message": "Email already exists"}), 400

    # 비밀번호 확인
    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    # 인증번호 생성
    confirmation_code = ''.join(secrets.choice(string.digits) for _ in range(6))

    # 이메일 보내기
    msg = Message(subject="Confirm your email address",
                  recipients=[email],
                  html=render_template_string("<p>Your confirmation code is: {{ code }}</p>",
                                              code=confirmation_code))
    user_routes.mail.send(msg)

    # 생성된 인증 코드를 DB에 저장
    conn.execute(text("""
        INSERT INTO manager (managerID, name, password, email, confirmation_code)
        VALUES (:managerID, :name, :password, :email, :confirmation_code)
    """), {
        'managerID': manager_id,
        'name': name,
        'password': password,
        'email': email,
        'confirmation_code': confirmation_code,
    })
    conn.commit()
    conn.close()

    return jsonify({
        "message": "A confirmation email has been sent to your email address",
        "confirmation_code": confirmation_code
    }), 200


@user_routes.route('/user/confirm-sign-up', methods=['POST'])
def confirm_sign_up():
    user_data = request.json
    email = user_data.get('email', '')
    confirmation_code = user_data.get('confirmation_code', '')
        
    # 인증번호 확인
    conn = user_routes.database.connect()
    result = conn.execute(text("""
        SELECT * FROM manager
        WHERE email = :email AND confirmation_code = :confirmation_code
    """), {'email': email, 'confirmation_code': confirmation_code})
    user = result.fetchone()
    
    if user:
        # 인증번호 일치하면 사용자 계정 활성화
        conn.execute(text("""
            UPDATE manager SET confirmation_code = NULL, active = TRUE WHERE email = :email
        """), {'email': email})
        conn.commit()
        conn.close()

        return jsonify({"message": "Registration successful"}), 200
    else:
        conn.close()
        return jsonify({"message": "Invalid confirmation code"}), 401

@user_routes.route('/user/login', methods=['POST'])
def login():
    credentials = request.json
    conn = user_routes.database.connect()
    result = conn.execute(text("""
        SELECT * FROM manager 
        WHERE managerID = :managerID AND password = :password
        """), credentials)
    user = result.fetchone()
    conn.close()
        
    if user:
        user_id, user_name, _, user_email, _ = user
        user_obj = User(user_id, user_name, credentials.get('managerID', ''))
        login_user(user_obj)  # 로그인
        return jsonify({
            "message": "Login successful",
            "user_id": user_id,
            "name": user_name,
            "email": user_email,
            "current_user": {
                "id": current_user.id,
                "name": current_user.name,
                "email": current_user.email
            }
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
@user_routes.route('/user/logout', methods=['GET'])
@login_required # 로그인 중에만 사용 가능
def logout():
    logout_user()  # 로그아웃
    return jsonify({"message": "Logout successful"}), 200
    
@user_routes.route('/user/find-id', methods=['POST'])
def find_id():
    email = request.json.get('email', '')
    
    # 이메일을 사용하여 아이디 찾기
    conn = user_routes.database.connect()
    result = conn.execute(text("""
        SELECT managerID FROM manager WHERE email = :email
    """), {'email': email})
    user = result.fetchone()
    conn.close()
    
    if user:
        manager_id = user[0]
        
        # 아이디를 이메일로 전송
        msg = Message(subject="Your Account ID",
                    recipients=[email],
                    body=f"Your account ID is: {manager_id}")
        mail.send(msg)
        
        return jsonify({
            "message": "Your account ID has been sent to your email address"
        }), 200
    else:
        return jsonify({"message": "No account found with this email address"}), 404

    
@user_routes.route('/user/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get('email', '')
    manager_id = data.get('managerID', '')
    
    # 새로운 임시 비밀번호 생성
    new_password = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(10))
    
    # 이메일로 새로운 비밀번호 전송
    msg = Message(subject="Reset Password",
                recipients=[email],
                body=f"임시 비밀번호: {new_password}")
    mail.send(msg)
    
    # 임시 비밀번호를 데이터베이스에 업데이트
    conn = user_routes.database.connect()
    conn.execute(text("""
        UPDATE manager SET password = :new_password 
        WHERE managerID = :manager_id AND email = :email
    """), {'new_password': new_password, 'manager_id': manager_id, 'email': email})
    conn.commit()
    conn.close()
    
    return jsonify({
    "message": "A new temporary password has been sent to your email address"
    }), 200