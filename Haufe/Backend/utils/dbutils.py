import mysql.connector
from mysql.connector import Error
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv('HOST')
DATABASE = os.getenv('DATABASE')
USER = os.getenv('USER')
PASSWORD = os.getenv('PASSWORD')

def init_db():
    try:
        connection = mysql.connector.connect(
            host=HOST,
            database=DATABASE,
            user=USER,
            password=PASSWORD
        )
        if connection.is_connected():
            cursor = connection.cursor()
            cursor.execute("CREATE TABLE IF NOT EXISTS accounts ("
                           "id INT AUTO_INCREMENT PRIMARY KEY,"
                           "email VARCHAR(255) NOT NULL,"
                           "password_hash VARCHAR(255) NOT NULL,"
                           "password_salt VARCHAR(255) NOT NULL"
                           ")")
            print("Table 'accounts' created or already exists.")
            cursor.close()
    except Error as e:
        print(f"Error initializing database: {e}")
    finally:
        if connection.is_connected():
            connection.close()

def save_account(email, password_hash, password_salt):
    try:
        connection = mysql.connector.connect(
            host=HOST,
            database=DATABASE,
            user=USER,
            password=PASSWORD
        )

        if connection.is_connected():
            cursor = connection.cursor()

            insert_query = "INSERT INTO accounts (email, password_hash, password_salt) VALUES (%s, %s, %s)"
            record = (email, password_hash, password_salt)
            cursor.execute(insert_query, record)
            connection.commit()

            print("Record inserted successfully into accounts table")
    except Error as e:
        print("Error while saving account:", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def account_exists(email):
    try:
        connection = mysql.connector.connect(
            host=HOST,
            database=DATABASE,
            user=USER,
            password=PASSWORD
        )

        if connection.is_connected():
            cursor = connection.cursor()

            query = "SELECT * FROM accounts WHERE email = %s"
            cursor.execute(query, (email,))
            result = cursor.fetchone()
            return result is not None
    except Error as e:
        print("Error while checking if account exists:", e)
        return False
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def is_account_valid(email, password):
    try:
        connection = mysql.connector.connect(
            host=HOST,
            database=DATABASE,
            user=USER,
            password=PASSWORD
        )

        if connection.is_connected():
            cursor = connection.cursor()

            query = "SELECT password_hash, password_salt FROM accounts WHERE email = %s"
            cursor.execute(query, (email,))
            result = cursor.fetchone()
            if result:
                stored_password_hash = result[0]
                password_salt = result[1]
                hashed_password = bcrypt.hashpw(password.encode('utf-8'), password_salt.encode('utf-8'))
                return hashed_password.decode('utf-8') == stored_password_hash
            else:
                return False
    except Error as e:
        print("Error while validating account:", e)
        return False
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
