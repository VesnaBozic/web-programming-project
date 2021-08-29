import flask
from flask import Blueprint
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt 
from utils.db import mysql

users_blueprint = Blueprint("users_blueprint", __name__)




@users_blueprint.route("/logged", methods=["GET"])
@jwt_required()
def get_user():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    for user in users:
        if user["id"] == get_jwt().get("id"):
            return flask.jsonify(user)
    
    return "", 404

@users_blueprint.route("/userType", methods=["GET"])
@jwt_required()
def get_user_type():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    for user in users:
        if user["id"] == get_jwt().get("id"):
            return flask.jsonify(get_jwt().get("roles"))
    return "", 404



@users_blueprint.route("/users", methods=["POST"])
def add_user():
    db = mysql.get_db()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO users(name, surname, username, user_type_id, lozinka) VALUES(%(name)s, %(surname)s, %(username)s, 1, %(lozinka)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    except:
        print("Error")
        return "", 403

@users_blueprint.route("/administrator", methods=["POST"])
@jwt_required()
def add_administrator():
    db = mysql.get_db()
    cursor = db.cursor()
    if(get_jwt().get("roles") == "administrator"):
        try:
            cursor.execute("INSERT INTO users(name, surname, username, user_type_id, lozinka) VALUES(%(name)s, %(surname)s, %(username)s, 2, %(lozinka)s)", flask.request.json)
            db.commit()
            return flask.request.json, 201
        except:
            print("Error")
            return "", 403

@users_blueprint.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def change_user(user_id):
    user = dict(flask.request.json)
    user["user_id"] = user_id
    db = mysql.get_db()
    cursor = db.cursor()
    if(get_jwt().get("roles") == "korisnik"):
        try:
            cursor.execute("UPDATE users SET name=%(name)s, surname=%(surname)s, username=%(username)s,balance=%(balance)s, user_type_id=%(user_type_id)s, lozinka=%(lozinka)s WHERE id=%(user_id)s", user)
            db.commit()
            cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))
            user = cursor.fetchone()
            return flask.jsonify(user)
        except:
            print("Error")
            return "", 403
    elif(get_jwt().get("roles") == "administrator"):
        try:
            cursor.execute("UPDATE users SET name=%(name)s, surname=%(surname)s, username=%(username)s, user_type_id=%(user_type_id)s, lozinka=%(lozinka)s WHERE id=%(user_id)s", user)
            db.commit()
            cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))
            user = cursor.fetchone()
            return flask.jsonify(user)
        except:
            print("Error")
            return "", 403

@users_blueprint.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def remove_user(user_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM movies.order WHERE users_id=%s", (user_id, ))
    cursor.execute("DELETE FROM users WHERE id=%s", (user_id, ))
    db.commit()
    return ""
