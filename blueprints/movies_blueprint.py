import flask
from flask import Blueprint
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt 
from utils.db import mysql

movies_blueprint = Blueprint("movies_blueprint", __name__)


@movies_blueprint.route("")
def get_all_movies():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM movies")
    movies = cursor.fetchall()
    return flask.jsonify(movies)

@movies_blueprint.route("/<int:movie_id>")
def get_movie(movie_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM movies WHERE id=%s",(movie_id,))
    movie = cursor.fetchone()
    return flask.jsonify(movie)
    


@movies_blueprint.route("", methods=["POST"])
@jwt_required()
def add_movies():
    db = mysql.get_db()
    cursor = db.cursor()
    if(get_jwt().get("roles") == "administrator"):
        cursor.execute("INSERT INTO movies(poster_src, name, genre, year, price, decription, directors_id) VALUES(%(poster_src)s, %(name)s, %(genre)s, %(year)s, %(price)s, %(decription)s, %(directors_id)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    else:
        return "", 503

@movies_blueprint.route("/<int:movie_id>", methods=["PUT"])
@jwt_required()
def change_movie(movie_id):
    movie = dict(flask.request.json)
    movie["movie_id"] = movie_id
    db = mysql.get_db()
    if(get_jwt().get("roles") == "administrator"):
        cursor = db.cursor()
        cursor.execute("UPDATE movies SET poster_src=%(poster_src)s , name=%(name)s, genre=%(genre)s, year=%(year)s, price=%(price)s, decription=%(decription)s, directors_id=%(directors_id)s  WHERE id=%(movie_id)s", movie)
        db.commit()
        cursor.execute("SELECT * FROM movies WHERE id=%s", (movie_id,))
        movie = cursor.fetchone()
        return flask.jsonify(movie)
    else:
        return "", 503

@movies_blueprint.route("/<int:movie_id>", methods=["DELETE"])
@jwt_required()
def remove_movie(movie_id):
    db = mysql.get_db()
    if(get_jwt().get("roles") == "administrator"):
        cursor = db.cursor()
        cursor.execute("DELETE FROM movies WHERE id=%s", (movie_id, ))
        db.commit()
        return ""
    else:
        return "", 503