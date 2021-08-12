import flask
from flask import Flask
from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

app = Flask(__name__, static_url_path="/")

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "films"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def home():
    return app.send_static_file("index.html")

#users
@app.route("/api/users")
def get_all_users():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()

    return flask.jsonify(users)

@app.route("/api/users/<int:user_id>")
def get_user(user_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM users WHERE id=%s",(user_id,))
    user = cursor.fetchone()
    return flask.jsonify(user)
   


@app.route("/api/users", methods=["POST"])
def add_user():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO users(name, surname, username, balance) VALUES(%(name)s, %(surname)s, %(username)s,%(balance)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/users/<int:user_id>", methods=["PUT"])
def change_user(user_id):
    user = dict(flask.request.json)
    user["user_id"] = user_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE users SET name=%(name)s, surname=%(surname)s, username=%(username)s,balance=%(balance)s WHERE id=%(user_id)s", user)
    db.commit()
    cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))
    user = cursor.fetchone()
    
    return flask.jsonify(user)

@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def remove_user(user_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM users WHERE id=%s", (user_id, ))
    db.commit()
    return ""


# movies


@app.route("/api/movies")
def get_all_movies():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM movies")
    movies = cursor.fetchall()
    return flask.jsonify(movies)

@app.route("/api/movies/<int:movie_id>")
def get_movie(movie_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM movies WHERE id=%s",(movie_id,))
    movie = cursor.fetchone()
    return flask.jsonify(movie)
    


@app.route("/api/movies", methods=["POST"])
def add_movies():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO movies(poster_src, name, genre, year, price, decription, directors_id) VALUES(%(poster_src)s, %(name)s, %(genre)s, %(year)s, %(price)s, %(decription)s, %(directors_id)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/movies/<int:movie_id>", methods=["PUT"])
def change_movie(movie_id):
    movie = dict(flask.request.json)
    movie["movie_id"] = movie_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE movies SET poster_src=%(poster_src)s , name=%(name)s, genre=%(genre)s, year=%(year)s, price=%(price)s, decription=%(decription)s, directors_id=%(directors_id)s  WHERE id=%(movie_id)s", movie)
    db.commit()
    cursor.execute("SELECT * FROM movies WHERE id=%s", (movie_id,))
    movie = cursor.fetchone()
    return flask.jsonify(movie)

@app.route("/api/movies/<int:movie_id>", methods=["DELETE"])
def remove_movie(movie_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM movies WHERE id=%s", (movie_id, ))
    db.commit()
    return ""

# # # directors

@app.route("/api/directors")
def get_all_directors():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM directors")
    directors = cursor.fetchall()
    return flask.jsonify(directors)

@app.route("/api/directors/<int:director_id>")
def get_director(director_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM directors WHERE id=%s",(director_id,))
    director = cursor.fetchone()
    return flask.jsonify(director)
    
@app.route("/api/directors", methods=["POST"])
def add_directors():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO directors( name, surname, image_src) VALUES( %(name)s, %(surname)s, %(image_src)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/directors/<int:director_id>", methods=["PUT"])
def change_director(director_id):
    director = dict(flask.request.json)
    director["director_id"] = director_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE directors SET name=%(name)s, surname=%(surname)s, image_src=%(image_src)s WHERE id=%(director_id)s", director)
    db.commit()
    cursor.execute("SELECT * FROM directors WHERE id=%s", (director_id,))
    director = cursor.fetchone()
    return flask.jsonify(director)

@app.route("/api/directors/<int:director_id>", methods=["DELETE"])
def remove_director(director_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM directors WHERE id=%s", (director_id, ))
    db.commit()
    return ""


#orders

@app.route("/api/orders")
def get_all_orders():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM films.order")
    order = cursor.fetchall()
    return flask.jsonify(order)

@app.route("/api/orders/<int:order_id>")
def get_order(order_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM films.order WHERE order_id=%s",(order_id,))
    order = cursor.fetchone()
    return flask.jsonify(order)
    
@app.route("/api/orders", methods=["POST"])
def add_order():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO films.order( movies_id, users_id, price, purchase_date) VALUES( %(movies_id)s, %(users_id)s, %(price)s,  %(purchase_date)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/orders/<int:order_id>", methods=["PUT"])
def change_order(order_id):
    order = dict(flask.request.json)
    order["order_id"] = order_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE films.order SET movies_id=%(movies_id)s, users_id=%(users_id)s, price=%(price)s, purchase_date=%(purchase_date)s WHERE order_id=%(order_id)s", order)
    db.commit()
    cursor.execute("SELECT * FROM films.order WHERE order_id=%s", (order_id,))
    order = cursor.fetchone()
    return flask.jsonify(order)

@app.route("/api/orders/<int:order_id>", methods=["DELETE"])
def remove_order(order_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM films.order WHERE order_id=%s", (order_id, ))
    db.commit()
    return ""