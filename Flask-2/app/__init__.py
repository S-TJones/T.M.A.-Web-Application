from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import os
import psycopg2
from flask_wtf.csrf import CSRFProtect 

from flask import render_template
app = Flask(__name__)

SQLALCHEMY_DATABASE_URI = "postgres://tjftrjrivugxxj:4317e7d1952b845ffb995bb61b2cc86c6056ddfd655e7586ed548c7b032a4010@ec2-54-85-13-135.compute-1.amazonaws.com:5432/daqc95jtc3j6st"
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

