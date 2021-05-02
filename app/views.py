
import os
from app import app, db, login_manager

from flask import render_template, request, redirect, url_for
from flask import flash, session, abort
from flask_login import login_user, logout_user, current_user, login_required
from flask.helpers import send_from_directory

from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash

from app.forms import *
from app.models import *

# Helper




# Routes


@app.route('/', methods=['GET', 'POST'])
def home():
    """Render website's home page."""
    # return "Hello World"

    review_form = ReviewForm()
    reviews = db.session.query(Review).all()

    # If a user that already signed in loads this page...
    if current_user.is_authenticated:
        if request.method == "POST":

            if review_form.validate_on_submit():

                uid = current_user.id
                uname = str(current_user.first_name) + \
                    " " + str(current_user.last_name)
                comment = review_form.comment.data
                rating = review_form.rating.data
                photo = current_user.user_photo
                
                if rating > 5:
                    flash('Rating cannot be more than 5.', category='error')
                elif rating < 1:
                    flash('Rating cannot be less than 1.', category='error')
                elif len(comment) < 2:
                    flash('Your review must be greater than 1 character.',
                          category='error')
                else:
                    new_review = Review(uid, uname, comment, rating, photo)

                    db.session.add(new_review)
                    db.session.commit()

                    flash('Review added successfully!', category='success')
                    return redirect(url_for('home'))
    # Else

    return render_template('home.html', reviews=reviews, form=review_form)


@app.route('/about/')
def about():
    """Render the website's about page."""
    return render_template('about.html')


@app.route('/reviews/', methods=['GET', 'POST'])
@login_required
def review():
    """Render the website's review page."""
    return render_template('reviews.html')


@app.route('/download/')
def download():
    """Render the website's application download page."""
    return render_template('download.html')


@app.route('/signup/', methods=['POST', 'GET'])
def signup():
    """Render the website's signup page."""

    # If a user that already signed in loads this page...
    if current_user.is_authenticated:
        # ...then redirect them to home page
        flash("You are already logged in.", "good")
        return redirect(url_for('home'))

    # Create the form
    signup_form = SignUpForm()

    if request.method == "POST":
        if signup_form.validate_on_submit():

            f_name = signup_form.first_name.data
            l_name = signup_form.last_name.data
            email = signup_form.email.data
            pass1 = signup_form.password1.data
            pass2 = signup_form.password2.data
            photo = "plain-user.jpg" # Sets default photo

            user = User.query.filter_by(email=email).first()

            # Verifying data
            if user:
                flash('Email already exists.', category='error')
            elif len(email) < 4:
                flash('Email must be greater than 3 characters.', category='error')
            elif len(f_name) < 2:
                flash('First name must be greater than 1 character.',
                      category='error')
            elif len(l_name) < 2:
                flash('Last name must be greater than 1 character.',
                      category='error')
            elif pass1 != pass2:
                flash('Passwords don\'t match.', category='error')
            elif len(pass1) < 7:
                flash('Password must be at least 7 characters.', category='error')
            else:
                new_user = User(f_name, l_name, email, pass1, photo)

                db.session.add(new_user)
                db.session.commit()

                login_user(new_user, remember=True)

                flash('Account created!', category='success')
                return redirect(url_for('home'))

    return render_template('signup.html', form=signup_form)


@app.route('/login/', methods=['POST', 'GET'])
def login():

    # If a user that already signed in loads this page...
    if current_user.is_authenticated:
        # ...then redirect them to home page
        flash("You are already logged in.", "good")
        return redirect(url_for('home'))

    # Create the form
    login_form = LoginForm()

    # Check for entered data
    if request.method == "POST":
        if login_form.validate_on_submit():

            email = login_form.email.data
            password = login_form.password.data

            user = User.query.filter_by(email=email).first()

            # Validate the fields
            if user is not None and check_password_hash(user.password, password):

                login_user(user)

                flash('Logged in successfully.', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Email or Password is incorrect.', 'danger')
                return redirect(url_for("login"))

        else:
            flash_errors(login_form)

    return render_template('login.html', form=login_form)


@app.route('/logout/')
@login_required
def logout():
    logout_user()

    flash("You have: Logged Out", "good")

    return redirect(url_for('home'))


# user_loader callback. This callback is used to reload the user object from
# the user ID stored in the session
@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.route('/dashboard/')
@login_required
def dashboard():
    """Render the website's dashboard page."""
    return render_template('dashboard.html')

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


def flash_errors(form):
    # Display Flask WTF errors as Flash messages

    for field, errors in form.errors.items():
        for error in errors:
            flash(u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            ), 'danger')


@app.route('/uploads/<filename>')
def get_image(filename):
    rootdir = os.getcwd()

    # Check if it's the "plain-user" image
    # if filename == "plain-user.jpg":
    #     return send_from_directory(os.path.join(rootdir, app.config['IMAGE_FOLDER']), filename)

    return send_from_directory(os.path.join(rootdir, app.config['UPLOAD_FOLDER']), filename)


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
