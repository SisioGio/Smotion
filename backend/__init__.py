from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_util_js import FlaskUtilJs
from flask_mail import Mail
import os
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
from datetime import timedelta

app = Flask(__name__,static_folder=os.path.abspath("../frontend/build"),static_url_path='')
CORS(app, support_credentials=True)
app.config["DEBUG"] = True
app.config["TESTING"] = False
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)


path = os.getcwd()
UPLOAD_FOLDER = os.path.join(path, "backend/static/images")
mail = Mail(app)

if not os.path.isdir(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(["pdf"])
app.config["MAX_CONTENT_LENGTH"] = 16 * 1000 * 1000

TEMPLATES_AUTO_RELOAD = True
app.config["TEMPLATES_AUTO_RELOAD"] = True
fujs = FlaskUtilJs(app)
app.config["SECRET_KEY"] = "ec1284e00372b1e61bb6ab3032650192"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


import backend.routes
