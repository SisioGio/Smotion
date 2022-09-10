from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from backend import db, app
from flask_login import UserMixin
from sqlalchemy.dialects.mysql import LONGTEXT

# class Images(db.Model, UserMixin):
#     id = db.Column(db.Integer,primary_key=True,nullable=False)
#     title = db.Column(db.String(60), nullable=False)
#     description = db.Column(db.String(200), nullable=False)
#     category = db.Column(db.String(500), nullable=False)
#     file = db.Column(db.String(60),nullable=True)
#     column = db.Column(db.Integer,nullable=False)
#     alt_text = db.Column(db.Integer,nullable=False)


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    path = db.Column(db.String(60), nullable=False)
    title = db.Column(db.String(60), nullable=False)
    text = db.Column(db.Text, nullable=False)
    seo = db.Column(db.Text, nullable=True)
    albums = db.relationship("Album", cascade="all,delete", backref="category")

    def __repr__(self):
        return f'<Category "{self.title}">'

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "path": self.path,
            "title": self.title,
            "text": self.text,
            "seo": self.seo,
            "category_id": self.text,
        }


class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    path = db.Column(db.String(60), nullable=False)
    title = db.Column(db.String(60), nullable=False)
    seo = db.Column(db.Text, nullable=True)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    pictures = db.relationship("Picture", cascade="all,delete", backref="album")

    def __repr__(self):
        return f'<Album "{self.title}">'

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "path": self.path,
            "title": self.title,
            "seo": self.seo,
            "category_id": self.category_id,
        }


class Picture(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    path = db.Column(db.String(60), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    album_id = db.Column(db.Integer, db.ForeignKey("album.id"), nullable=False)
    class_name = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f'<Picture "{self.path}">'

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "path": self.path,
            "upload": self.upload_date,
            "album": self.album_id,
            "css_class": self.class_name,
        }
