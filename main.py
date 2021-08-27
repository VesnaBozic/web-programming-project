import flask
from flask import Flask
from flaskext.mysql import MySQL
from flaskext.mysql import pymysql
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt 



app = Flask(__name__, static_url_path="/")

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "movies"



app.config["JWT_SECRET_KEY"] = "fdjkdfjkl;flfrlkwrjkgr"  
jwt = JWTManager(app)
mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def home():
    return app.send_static_file("index.html")

#users
@app.route("/api/login", methods=["POST"])
def login():
    try:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM users WHERE username=%(username)s and lozinka=%(lozinka)s", flask.request.json)
        user = cursor.fetchone()
        cursor.execute("SELECT * FROM user_type WHERE id=%s",(user["user_type_id"],))
        roles = cursor.fetchone()
        if user is not None:
            access_token = create_access_token(identity=user["username"], additional_claims={"roles":roles["naziv"], "id":user["id"]})
            return flask.jsonify(access_token),200
        return "", 403
    except:
        return "", 403


@app.route("/api/logged", methods=["GET"])
@jwt_required()
def get_user():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    for user in users:
        if user["id"] == get_jwt().get("id"):
            return flask.jsonify(user)
    
    return "", 404

@app.route("/api/userType", methods=["GET"])
@jwt_required()
def get_user_type():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    for user in users:
        if user["id"] == get_jwt().get("id"):
            return flask.jsonify(get_jwt().get("roles"))
    return "", 404



@app.route("/api/users", methods=["POST"])
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

@app.route("/api/administrator", methods=["POST"])
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

@app.route("/api/users/<int:user_id>", methods=["PUT"])
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

@app.route("/api/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def remove_user(user_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM movies.order WHERE users_id=%s", (user_id, ))
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
@jwt_required()
def get_all_orders():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT name, poster_src, movies.price, purchase_date, users_id FROM movies INNER JOIN movies.order ON movies.id=movies.order.movies_id")
    orders = cursor.fetchall()
    myOrders =[]
    for order in orders:
        if (order["users_id"] == get_jwt().get("id")):
            myOrders.append(order)
    
    return flask.jsonify(myOrders)


@app.route("/api/orders", methods=["POST"])
@jwt_required()
def add_order():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO movies.order( price, purchase_date, users_id, movies_id) VALUES(  %(price)s,  %(purchase_date)s, %(users_id)s, %(movies_id)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201





