from flask import Flask
from flask_mail import Mail
from sqlalchemy import create_engine
from flask_login import LoginManager
import os
from flask_cors import CORS

build_dir = os.path.join('..', 'truck_detection_front', 'build')

login_manager = LoginManager()
mail = Mail()
UPLOAD_FOLDER = 'uploads'

def create_app(test_config=None):
    app = Flask(__name__, template_folder='templates/build', static_folder=build_dir)
    CORS(app)
    app.config.from_pyfile('config.py')
    app.config['SECRET_KEY'] = 'abcdef'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    mail.init_app(app)

    db_url = app.config['DB_URL']
    database = create_engine(db_url)
    app.database = database
    
    login_manager.init_app(app)

    from .routes import user_routes  # routes.py를 패키지 내부에 위치시킴
    app.register_blueprint(user_routes)

    user_routes.mail = mail
    user_routes.login_manager = login_manager
    user_routes.database = database

    return app