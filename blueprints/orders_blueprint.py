import flask
from flask import Blueprint
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt 
from utils.db import mysql

orders_blueprint = Blueprint("orders_blueprint", __name__)

@orders_blueprint.route("")
@jwt_required()
def get_all_orders():
    cursor = mysql.get_db().cursor()
    if(get_jwt().get("roles") == "korisnik"):
        cursor.execute("SELECT name, poster_src, movies.price, purchase_date, users_id FROM movies INNER JOIN movies.order ON movies.id=movies.order.movies_id")
        orders = cursor.fetchall()
        myOrders =[]
        for order in orders:
            if (order["users_id"] == get_jwt().get("id")):
                myOrders.append(order)
        
        return flask.jsonify(myOrders)
    else:
        return "", 503


@orders_blueprint.route("", methods=["POST"])
@jwt_required()
def add_order():
    db = mysql.get_db()
    if(get_jwt().get("roles") == "korisnik"):
        cursor = db.cursor()
        cursor.execute("INSERT INTO movies.order( price, purchase_date, users_id, movies_id) VALUES(  %(price)s,  %(purchase_date)s, %(users_id)s, %(movies_id)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    else:
        return "", 503
