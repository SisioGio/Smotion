from importlib.resources import path
import re
from turtle import width
from flask import render_template, url_for, flash, redirect, request, send_file
from backend import app, db, mail, ALLOWED_EXTENSIONS, jwt
from backend.forms import add_category, add_album
from backend.models import Picture, Album
from time import localtime, strftime
from flask_mail import Message
from flask import jsonify
import datetime
from datetime import timezone, timedelta
from werkzeug.utils import secure_filename
import secrets
from PIL import Image
import os
import json
import time

from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager,
)


def save_document(new_file):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(new_file.filename)
    picture_fn = random_hex + f_ext
    new_file_path = os.path.join(app.root_path, "static/images/", picture_fn)
    new_file.save(new_file_path)

    return new_file_path


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response


# @app.route("/new_category/", methods=["GET", "POST"])
# def new_category():
#     try:
#         # json_data = request.json["title"]
#         # print(json_data)
#         # data = json.loads(json_data)
#         # print(json_data["title"])
#         # print(json_data["text"])
#         # print(json_data["seo"])
#         title = request.form.get("title")
#         text = request.form.get("text")
#         seo = request.form.get("seo")
#         data = request.files.get("file")

#         path = save_document(data)

#         new_category = Category(title=title, text=text, seo=seo, path=path)
#         db.session.add(new_category)
#         db.session.commit()
#         print("New category added")
#         return {"Message": "Daje!"}
#     except Exception as e:
#         print("Error while creating category: " + str(e))
#         return "Error while creatin category", 400


# @app.route("/update_category/", methods=["GET", "POST"])
# def update_category():
#     try:
#         category = Category.query.get_or_404(request.form.get("id"))
#         print("Update category: " + request.form.get("id"))
#         title = request.form.get("title")
#         text = request.form.get("text")
#         print("text is " + text)
#         seo = request.form.get("seo")
#         data = request.files.get("file")
#         category.title = title
#         category.text = text
#         category.seo = seo
#         path = category.path

#         if data:
#             path = save_document(data)
#         category.path = path

#         db.session.commit()
#         print("Category updated!")
#         return {"Message": "Daje!"}
#     except Exception as e:
#         print("Error while updating category: " + str(e))
#         return "Error while updating category", 400


# @app.route("/delete_category/", methods=["GET", "POST"])
# def delete_category():
#     try:
#         category = Category.query.get_or_404(request.form.get("id"))
#         db.session.delete(category)

#         db.session.commit()
#         print("Category deleted!")
#         return {"Message": "Daje!"}
#     except Exception as e:
#         print("Error while deleting category: " + str(e))
#         return "Error while deleting category", 400


def is_locked(filepath):
    locked = None
    file_object = None
    if os.path.exists(filepath):
        try:
            buffer_size = 8
            # Opening file in append mode and read the first 8 characters.
            file_object = open(filepath, "a", buffer_size)
            if file_object:
                locked = False
        except IOError as message:
            locked = True
        finally:
            if file_object:
                file_object.close()
    return locked


def wait_for_file(filepath):
    wait_time = 1
    while is_locked(filepath):
        time.sleep(wait_time)


@app.route("/new_album/", methods=["POST"])
def new_album():
    # try:
    seo = request.form.get("seo")
    title = request.form.get("title")
    album_picture = request.files.get("album_file")
    album_picture_path = save_document(album_picture)
    new_album = Album(
        title=title,
        path=album_picture_path,
        seo=seo,
    )
    db.session.add(new_album)
    db.session.flush()
    print(new_album.id)
    data = request.files.getlist("file")
    for image in data:
        print("Saving image" + image.filename)
        filename = save_document(image)
        with Image.open(filename) as img:
            # img = Image.open(filename)
            css_class = ""
            if img.width > img.height:
                css_class = "h-stretch"
            elif img.height > img.width:
                css_class = "v-stretch"
            elif img.height == img.width:
                css_class = "big-stretch"
        new_image = Picture(album_id=new_album.id, path=filename, class_name=css_class)
        db.session.add(new_image)
        db.session.commit()
    # except Exception as e:
    #     print(str(e))
    #     print("Error while creating album.")
    #     return jsonify({"error": "Files not uploaded"}), 403
    return "New  Category URL!"


@app.route("/update_album/", methods=["GET", "POST"])
def update_album():
    title = request.form.get("title")
    album_id = request.form.get("album_id")
    category_id = request.form.get("category")
    seo = request.form.get("seo")
    album_picture = request.files.get("album_file")

    album_to_update = Album.query.get_or_404(album_id)

    album_picture_path = album_to_update.path

    if album_picture:
        album_picture_path = save_document(album_picture)

    album_to_update.title = title
    album_to_update.category_id = category_id
    album_to_update.seo = seo
    album_to_update.path = album_picture_path

    db.session.commit()
    print("Album updated!")

    return "New  Album Added"


@app.route("/delete_album/", methods=["GET", "POST"])
def delete_album():

    album_id = request.form.get("album_id")
    album_to_delete = Album.query.get_or_404(album_id)
    db.session.delete(album_to_delete)
    db.session.commit()
    print("Album Deleted!!")

    return "Album Deleted!!"


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


# @app.route("/get_categories/", methods=["GET"])
# def get_categories():
#     categories = Category.query.all()
#     return jsonify(files=[i.serialize for i in categories])


# @app.route("/get_category_image/<img_id>", methods=["GET"])
# def get_category_image(img_id):
#     image = Category.query.get(img_id)
#     return send_file(image.path)


@app.route("/get_album_image/<img_id>", methods=["GET"])
def get_album_image(img_id):
    image = Album.query.get(img_id)
    return send_file(image.path)


@app.route("/get_albums/", methods=["GET"])
def get_albums():
    albums = Album.query.all()
    return jsonify(files=[i.serialize for i in albums])


@app.route("/get_album_img/<img_id>", methods=["GET"])
def get_album_img(img_id):
    image = Album.query.get(img_id)

    return send_file(image.path)


@app.route("/get_photos/", methods=["GET"])
def get_photos():
    pictures = Picture.query.all()
    return jsonify(files=[i.serialize for i in pictures])


@app.route("/new_photo/", methods=["GET", "POST"])
def new_photo():
    try:
        print("Adding new images...")
        album_id = request.form.get("album")
        data = request.files.getlist("file")
        for image in data:
            print("Saving image" + image.filename)
            filename = save_document(image)
            with Image.open(filename) as img:
                # img = Image.open(filename)
                css_class = ""
                if img.width > img.height:
                    css_class = "h-stretch"
                elif img.height > img.width:
                    css_class = "v-stretch"
                elif img.height == img.width:
                    css_class = "big-stretch"
            new_image = Picture(album_id=album_id, path=filename, class_name=css_class)
            db.session.add(new_image)
            db.session.commit()

    except Exception as e:
        print(str(e))
        return {"Error": "Upload files failed."}
    return "New  Photo added!"


@app.route("/update_photo/", methods=["GET", "POST"])
def update_photo():
    print("Updating file...")
    photo_id = request.form.get("photo_id")
    album_id = request.form.get("album")
    print("PHOTO ID: " + photo_id)
    photo = Picture.query.get_or_404(photo_id)
    photo_path = photo.path
    if request.files.get("photo"):
        new_photo_path = save_document(request.files.get("photo"))
        photo.path = new_photo_path
    db.session.commit()

    print("File updated!")
    return "File updated!"


@app.route("/delete_photo/", methods=["GET", "POST"])
def delete_photo():
    photo_id = request.form.get("photo_id")
    photo_to_remove = Picture.query.get_or_404(photo_id)
    db.session.delete(photo_to_remove)
    db.session.commit()

    print("File deleted!")
    return "File deleted!"


@app.route("/get_picture/<img_id>", methods=["GET"])
def get_picture(img_id):
    picture = Picture.query.get(img_id)

    return send_file(picture.path)
