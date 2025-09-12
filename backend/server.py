from flask import Flask, jsonify, request
from flask_cors import CORS
import os, json
from datetime import datetime

app = Flask(__name__)
CORS(app)

USER_ACCOUNT = {
    "email": "yura@mail.ru",
    "password": "qwerty1234"
}

logs_file = "logs.txt"

@app.route("/api/users", methods=["POST"])
def users():
    try:
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        print(f"got data:\n{username}\n{password}")
        with open(logs_file, "a") as file:
            file.write(f"\n[INFO] {datetime.now()}: got data:\n{username}\n{password}")

        if username == USER_ACCOUNT["email"] and password == USER_ACCOUNT["password"]:
            with open(logs_file, "a") as file:
                file.write(f"\n[MESSAGE] {datetime.now()}: server successfully got data in DataBase: {username} and {password} with code 200")
            return jsonify({
                "status": "success",
                "message": f"server successfully got data in DataBase: {username} and {password}",
                "user": username
            }), 200
        else:
            with open(logs_file, "a") as file:
                file.write(f"\n[ERROR] {datetime.now()}: server not found data in DataBase: {username} and {password} with code 404")
            return jsonify({
                "status": "failed",
                "message": f"server not found data in DataBase: {username} and {password}"
            }), 404

    except Exception as err:
        print("error ", err)
        with open(logs_file, "a") as file:
            file.write(f"\n[ERROR] {datetime.now()}: server failed to get data with code 500")
        return jsonify({
            "status": "error",
            "message": "server failed to get data"
        }), 500

if __name__ == "__main__":
    app.run(debug=True)