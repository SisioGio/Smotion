from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from backend import db, app
from flask_login import UserMixin
from sqlalchemy.dialects.mysql import LONGTEXT


class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    path = db.Column(db.String(60), nullable=False)
    title = db.Column(db.String(60), nullable=False)
    seo = db.Column(db.Text, nullable=True)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    pictures = db.relationship("Picture", cascade="all,delete", backref="album")

    def __repr__(self):
        return f'<Album "{self.title}">'

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {"id": self.id, "path": self.path, "title": self.title, "seo": self.seo}


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

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    path = db.Column(db.String(60), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    name = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f'<Client "{self.name}">'

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "path": self.path,
            "upload": self.upload_date,
            "name":self.name
        }