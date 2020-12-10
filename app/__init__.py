from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import os
import psycopg2
from flask_wtf.csrf import CSRFProtect 

from flask import render_template
app = Flask(__name__)

SQLALCHEMY_DATABASE_URI = "postgres://tdkwgwxevxwoun:019a4b48c47fc500662143fac01be4105f79c8ba2dce0c3f62f92e9eaa6ec901@ec2-35-169-184-61.compute-1.amazonaws.com:5432/d6ie4440vgoo3j"
SQLALCHEMY_TRACK_MODIFICATIONS = False
UPLOAD_FOLDER = "./app/static/uploads"
SECRET_KEY = 'Sup3r$3cretkey'

app.config.from_object(__name__)

csrf = CSRFProtect(app)
db = SQLAlchemy(app)
login = LoginManager(app) 
login.init_app(app)
login.login_view = 'login'

from app import views

