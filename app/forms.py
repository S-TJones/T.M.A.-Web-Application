
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, PasswordField
from wtforms.validators import InputRequired, DataRequired, Email
from wtforms.widgets import TextArea


# User Class
class SignUpForm(FlaskForm):

    first_name = StringField('Username', validators=[InputRequired()])
    last_name = StringField('Name', validators=[DataRequired()])
    email = StringField('E-mail', validators=[DataRequired(), Email()])
    password1 = PasswordField('Password', validators=[InputRequired()])
    password2 = PasswordField('Password (Confirm)',
                              validators=[InputRequired()])
# ---------------------------------------------------------------------------------------

# Login Class


class LoginForm(FlaskForm):

    email = StringField('E-mail', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[InputRequired()])
# ---------------------------------------------------------------------------------------


# Review Class
class ReviewForm(FlaskForm):

    comment = StringField('Message', widget=TextArea(),
                          validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[InputRequired()])
# ---------------------------------------------------------------------------------------

    rating = IntegerField('Rating', validators=[InputRequired()])
#---------------------------------------------------------------------------------------
