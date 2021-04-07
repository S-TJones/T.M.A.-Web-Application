
from . import db
from werkzeug.security import generate_password_hash


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = generate_password_hash(
            password, method='pbkdf2:sha256')

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        # return '<User %r>' % (self.email)
        return f'<User {self.first_name} {self.last_name} {self.email} {self.password}>'


# Review
class Review(db.Model):
    uid = db.Column(db.Integer)
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255))
    rating = db.Column(db.Integer)

    def __init__(self, uid, comment, rating):
        self.uid = uid
        self.comment = comment
        self.rating = rating

    def __repr__(self):
        # return '<Review %r>' % (self.email)
        return f'<Review {self.comment} {self.rating}>'

# Task


class Task(db.Model):
    uid = db.Column(db.Integer)
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    message = db.Column()

    def __init__(self, uid, title, message):
        self.uid = uid
        self.title = title
        self.message = message

    def __repr__(self):
        # return '<Task %r>' % (self.email)
        return f'<Task {self.title} {self.message}>'
