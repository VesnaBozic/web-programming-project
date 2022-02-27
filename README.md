# Web programming project - Site for selling movies

University project for Web programming. 

## Technologies used :

![technologies](/assets/vuejs.png) ![technologies](/assets/flask.png) ![technologies](/assets/html5.png) ![technologies](/assets/css3.png) ![technologies](/assets/mysql.png)

## Project Description

It's a site for selling movie.

Visitor can create an account as a client and log in as an administrator.

![technologies](/assets/1.jpg)

A client can edit their profile setting, can see all movies and directors in the database, detals about movies, add money to their account, and if they had enough money can buy a movie. Client can search movies. A client can delete his account.

![technologies](/assets/2.jpg)

Client can buy movies.

![technologies](/assets/3.jpg)


Administrators can do CRUD operations with movies, directors. Only existing administrator can add new administrator.

# About Flask

 [**Link to Flask documentation**](https://flask.palletsprojects.com/en/2.0.x/)

 ## How to install virtual environment and run web application:
 
 > **python -m venv**
 
 
 ### Install Flask in python virtual environment
 
 > **python -m pip install flask**
 
 ### How to activate virtual environment:
 
 > **path\name\scripts\activate**
 
 ### To run app: run commands in active virtual environment:
 ```bash 
 SET FLASK_APP=main.py
 
 SET FLASK_ENV=development 
 
 flask run
 ```
 
 ### Install Flask-MySQL
 
 Flask-MySQL is a Flask extension that allows you to access a MySQL database.
 
 Use pip to install flask-mysql :
 
 ```
 pip install flask-mysql
 ```
 
 ### Install Flask-JWT-Extended
 
 ```
 pip install flask-jwt-extended
 ```
