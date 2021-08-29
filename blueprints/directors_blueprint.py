import flask
from flask import Blueprint
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt 
from utils.db import mysql

directors_blueprint = Blueprint("directors_blueprint", __name__)


@directors_blueprint.route("")
@jwt_required()
def get_all_directors():
    cursor = mysql.get_db().cursor()
    if(get_jwt().get("roles") == "administrator"):
        cursor.execute("SELECT * FROM directors")
        directors = cursor.fetchall()
        return flask.jsonify(directors)

@directors_blueprint.route("/<int:director_id>")
def get_director(director_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM directors WHERE id=%s",(director_id,))
    director = cursor.fetchone()
    return flask.jsonify(director)
    
@directors_blueprint.route("", methods=["POST"])
@jwt_required()
def add_directors():
    db = mysql.get_db()
    if(get_jwt().get("roles") == "administrator"):
        cursor = db.cursor()
        cursor.execute("INSERT INTO directors( name, surname, image_src) VALUES( %(name)s, %(surname)s, %(image_src)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    else:
        return "", 503

@directors_blueprint.route("/<int:director_id>", methods=["PUT"])
@jwt_required()
def change_director(director_id):
    director = dict(flask.request.json)
    director["director_id"] = director_id
    db = mysql.get_db()
    if(get_jwt().get("roles") == "administrator"):
        cursor = db.cursor()
        cursor.execute("UPDATE directors SET name=%(name)s, surname=%(surname)s, image_src=%(image_src)s WHERE id=%(director_id)s", director)
        db.commit()
        cursor.execute("SELECT * FROM directors WHERE id=%s", (director_id,))
        director = cursor.fetchone()
        return flask.jsonify(director)
    else:
        return "", 503

@directors_blueprint.route("/<int:director_id>", methods=["DELETE"])
@jwt_required()
def remove_director(director_id):
    db = mysql.get_db()
    if(get_jwt().get("roles") == "administrator"):
        try:
            cursor = db.cursor()
            cursor.execute("DELETE FROM directors WHERE id=%s", (director_id, ))
            db.commit()
            return ""
        except:
            print("Error")
            return "", 403
    else:
        return "", 503
