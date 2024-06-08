from flask import Flask, request, jsonify, Response
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin 
from dotenv import load_dotenv
import os
from utils import dbutils

app = Flask(__name__)
load_dotenv()

HOST = os.getenv('HOST')
DATABASE = os.getenv('DATABASE')
USER = os.getenv('USER')
PASSWORD = os.getenv('PASSWORD')

app.config['MYSQL_HOST'] = HOST
app.config['MYSQL_USER'] = USER
app.config['MYSQL_PASSWORD'] = PASSWORD
app.config['MYSQL_DB'] = DATABASE

mysql = MySQL(app)

# Configure CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res

@app.route('/api/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    try:
        if dbutils.is_account_valid(email, password):
            jwt_token = dbutils.generate_jwt(email, password)
            return jsonify({'message': 'Login successful', 'token': jwt_token}), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if dbutils.account_exists(email):
        return jsonify({'error': 'An account with this email already exists.'}), 400

    hashed_password, salt = dbutils.encrypt_pass(password)

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Registration successful'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recommendations', methods=['POST'])
def add_recommendation():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    image_url = data.get('image')

    if not title or not description:
        return jsonify({'error': 'Title and description are required.'}), 400

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO recommendations (title, description, image_url) VALUES (%s, %s, %s)",
                       (title, description, image_url))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Recommendation added successfully.'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    dbutils.init_db()
    app.run(debug=True, port=5000)
