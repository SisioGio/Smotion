from importlib.resources import path
import re
import requests
from flask import render_template, url_for, flash, redirect, request, send_file
from backend import app, db, mail, ALLOWED_EXTENSIONS, jwt
from backend.forms import add_category, add_album
from backend.models import Picture, Album, Client
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
from flask.helpers import send_from_directory
import boto3, botocore
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager,
)



# s3 = boto3.client(
#    "s3",
#    aws_access_key_id=app.config['S3_KEY'],
#    aws_secret_access_key=app.config['S3_SECRET']
# )

def s3_login():
    session = boto3.Session(
    aws_access_key_id="AKIAYG4A4OEXYDU6ED4R", 
    aws_secret_access_key="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")
    s3_client = session.client('s3')
    return s3_client
    
    
    

@app.route('/')
# @cross_origin()
def serve():
    return app.send_static_file('index.html')


def save_document(new_file):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(new_file.filename)
    picture_fn = random_hex + f_ext
    new_file_path = os.path.join("https://calm-wave-28039.herokuapp.com/", "static/images/", picture_fn)
    new_file.save(new_file_path)

    return new_file_path

def save_document_to_s3(s3,new_file, acl="public-read"):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(new_file.filename)
    filename =secure_filename(random_hex + f_ext)
    try:
        s3.upload_fileobj(new_file, "smotion", filename)
        object_url = "https://s3-eu-central-1.amazonaws.com/smotion/{0}".format(filename)
        
        
        print(object_url)
    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e
    

    # after upload file to s3 bucket, return filename of the uploaded file
    return filename,object_url


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


@app.route("/album/", methods=["POST"])
def new_album():
    # try:
    seo = request.form.get("seo")
    title = request.form.get("title")
    album_picture = request.files.get("album_file")
    s3 = s3_login()
    album_picture_path,image_url = save_document_to_s3(s3,album_picture)
    
    with Image.open(requests.get(image_url, stream=True).raw) as img:
        print(img.height)
        if(img.width != 1920 or img.height != 600):
            return jsonify(message="Image size must be 1920 x 600 px"),500
        
        
        
    new_album = Album(
        title=title,
        path=image_url,
        seo=seo,
    )
    db.session.add(new_album)
    db.session.commit()
    db.session.flush()
    print(new_album.id)
    # data = request.files.getlist("file")
    # for image in data:
        # print("Saving image" + image.filename)
        # filename,image_url = save_document_to_s3(s3,image)
        # print(image_url)
        # img = Image.open(requests.get(image_url, stream=True).raw)
        # # img = Image.open(filename)
        # css_class = ""
        # if img.width > img.height:
        #     css_class = "h-stretch"
        # elif img.height > img.width:
        #     css_class = "v-stretch"
        # elif img.height == img.width:
        #     css_class = "big-stretch"
        # new_image = Picture(album_id=new_album.id, path=image_url, class_name=css_class)
        # db.session.add(new_image)
        # db.session.commit()
    # except Exception as e:
    #     print(str(e))
    #     print("Error while creating album.")
    #     return jsonify({"error": "Files not uploaded"}), 403
    return "OK!"


@app.route("/album/", methods=["PUT"])
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


@app.route("/album/", methods=["DELETE"])
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



@app.route("/get_album_image/<img_id>", methods=["GET"])
def get_album_image(img_id):
    image = Album.query.get(img_id)
    return image.path


@app.route("/albums/", methods=["GET"])
def get_albums():
    albums = Album.query.all()
    return jsonify(files=[i.serialize for i in albums])


@app.route("/get_album_img/<img_id>", methods=["GET"])
def get_album_img(img_id):
    image = Album.query.get(img_id)
    print("Image path is " + image.path)
    return "Hello"


@app.route("/photo/", methods=["GET"])
def get_photos():
    pictures = Picture.query.all()
    return jsonify(files=[i.serialize for i in pictures])


@app.route("/photo/", methods=["POST"])
def new_photo():
    try:
        print("Adding new images...")
        album_id = request.form.get("album")
        data = request.files.getlist("file")
        s3 = s3_login()
        for image in data:
            print("Saving image" + image.filename)
            filename,image_url  = save_document_to_s3(s3,image)
            with Image.open(requests.get(image_url, stream=True).raw) as img:
                # img = Image.open(filename)
               
                css_class = ""
                if img.width > img.height:
                    css_class = "h-stretch"
                elif img.height > img.width:
                    css_class = "v-stretch"
                elif img.height == img.width:
                    css_class = "big-stretch"
            new_image = Picture(album_id=album_id, path=image_url, class_name=css_class)
            db.session.add(new_image)
            db.session.commit()
        pictures = Picture.query.all()
        return jsonify(files=[i.serialize for i in pictures])

    except Exception as e:
        print(str(e))
        return {"Error": "Upload files failed."}
  


@app.route("/photo/", methods=["PUT"])
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


@app.route("/test/", methods=["GET"])
def test():
    return "Hello from Alessio!"


@app.route("/sendemail/",methods=["GET","POST"])
def sendemail():

    
        
    from_email = request.form.get("email")
    from_name = request.form.get("name")
    from_surname = request.form.get("surname")
    from_phnumber = request.form.get("phone")
    text = request.form.get("text")
    msg = Message("Hey There",recipients="alessiogiovannini@hotmail.it".split())
    msg.html = "<p>Hello!</p><p></p>"+ from_name + " would like to be contacted!</p><p></p><p> Client email:  "+ from_email+"</p><p></p><p> Client Phone No.:  " + from_phnumber+"</p><p></p><p> Client name No.:  " + from_name+ ":<p></p>"+ text +"</p><p></p>"
    mail.send(msg)
        

    print(from_email + " | " + from_name + " | " + from_surname + " | " + from_phnumber + " | " + text)
    
    return "All great!"


@app.route("/new_client/", methods=["POST"])
def new_client():
    s3 = s3_login()
    data = request.files.getlist("file")
    for image in data:
        print("Saving client logo " + image.filename)

        filename,image_url = save_document_to_s3(s3,image)
        print(image_url)
        new_client = Client(
                            name="Dummy",
                            path=image_url,
        )
        db.session.add(new_client)
        db.session.commit()
    
    return "New  Client added"

@app.route("/get_clients/", methods=["GET"])
def get_clients():
    clients = Client.query.all()
    return jsonify(files=[i.serialize for i in clients])

@app.route("/delete_client/", methods=["POST"])
def delete_client():
    client_id = request.form.get("client_id")
    client_to_remove = Client.query.get_or_404(client_id)
    db.session.delete(client_to_remove)
    db.session.commit()
    
    return "Client removed"