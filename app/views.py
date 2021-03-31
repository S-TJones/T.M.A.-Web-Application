
import os
from app import app, db, login_manager
from flask import render_template, request, redirect, url_for
from flask import flash, session, abort
from flask_login import login_user, logout_user, current_user, login_required
from flask.helpers import send_from_directory
from werkzeug.security import check_password_hash

# Routes


@app.route('/')
def home():
    """Render website's home page."""
    # return "Hello World"
    return render_template('home.html')


@app.route('/about/')
def about():
    """Render the website's about page."""
    return render_template('about.html')


@app.route('/login', methods=['POST', 'GET'])
def login():

    return "Log in"


@app.route('/logout')
def logout():

    return "Logged Out"

# Helper Function -----------------------------------
# Python script for iterating over files in a specific directory


# def get_uploaded_images():

#     file_list = list()
#     rootdir = os.path.join(app.config['UPLOAD_FOLDER'])

#     for subdir, dirs, files in os.walk(rootdir):

#         for file in files:
#             file_list.append(file)

#     return file_list

###
# The functions below should be applicable to all Flask apps.
###

# Display Flask WTF errors as Flash messages


def flash_errors(form):
    for field, errors in form.errors.items():
        for error in errors:
            flash(u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            ), 'danger')


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


# -----------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
