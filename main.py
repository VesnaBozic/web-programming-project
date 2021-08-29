import flask
from flask import Flask
from utils.db import mysql
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt 
from blueprints.user_blueprint import users_blueprint
from blueprints.directors_blueprint import directors_blueprint
from blueprints.movies_blueprint import movies_blueprint
from blueprints.orders_blueprint import orders_blueprint



app = Flask(__name__, static_url_path="/")

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "movies"

app.register_blueprint(users_blueprint, url_prefix="/api")
app.register_blueprint(directors_blueprint, url_prefix="/api/directors")
app.register_blueprint(movies_blueprint, url_prefix="/api/movies")
app.register_blueprint(orders_blueprint, url_prefix="/api/orders")



app.config["JWT_SECRET_KEY"] = "fdjkdfjkl;flfrlkwrjkgr"  
jwt = JWTManager(app)

mysql.init_app(app)

@app.route("/")
def home():
    return app.send_static_file("index.html")


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





