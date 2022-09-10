from secrets import choice
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from flask_login import current_user
from wtforms import MultipleFileField
from wtforms import (
    StringField,
    PasswordField,
    TextAreaField,
    SelectField,
    SubmitField,
    BooleanField,
    FloatField,
    MultipleFileField,
)
from wtforms.validators import (
    DataRequired,
    Length,
    Email,
    EqualTo,
    ValidationError,
    Regexp,
)


class add_category(FlaskForm):
    title = StringField("Title", [DataRequired()])
    text = TextAreaField("Description", [DataRequired()])
    seo = StringField("Seo")
    submit = SubmitField("Upload")


class add_album(FlaskForm):
    title = StringField("Title", [DataRequired()])
    text = TextAreaField("Description", [DataRequired()])
    seo = StringField("Seo")
    main_picutre = FileField(
        "Main Picture", render_kw={"multiple": False}, validators=[FileAllowed(["jpg"])]
    )
    pictures = MultipleFileField(
        "Photos", render_kw={"multiple": True}, validators=[FileAllowed(["jpg"])]
    )
    submit = SubmitField("Upload")
