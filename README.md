# Web programming project - Site for selling movies

University project for Web programming. 

## Technologies used :


## Project Description

It's a site for selling movie. Visitor can see movies in a database.

Visitor can create an account as a client and log in as an administrator.

A client can edit their profile setting, can see all movies in the database, add money to their account, and if they had enough money can buy a movie.

Administrators can do CRUD operations with movies, directors. Only existing administrator can add new administrator.

# About Flask

 [**Link to Flask documentation**](https://flask.palletsprojects.com/en/2.0.x/)

 ## How to install virtual environment and run web application:
 
 > **python -m venv**
 
 
 ### Install Flask in python virtual environment
 
 > **python -m pip install flask**
 
 ### How to activate virtual environment:
 
 > **path\name\scripts\activate**
 
 ### Run this commands in active virtual environment:
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
