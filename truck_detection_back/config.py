import os

db = {
    'user'     : 'root',
    'password' : '8257',
    'host'     : '35.238.27.165',
    'port'     : '3306',
    'database' : 'truck_detection'
}

MAIL_SERVER='smtp.gmail.com'
MAIL_PORT = 465
MAIL_USERNAME = 'ssmm8259@gmail.com'
MAIL_PASSWORD = 'iteq nqzo fqzt lkci'
MAIL_USE_TLS = False  
MAIL_USE_SSL = True 
MAIL_DEFAULT_SENDER = 'truck_detection_system'
UPLOAD_FOLDER = os.path.join('uploads')

DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"