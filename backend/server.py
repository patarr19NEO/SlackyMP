from flask import Flask, jsonify, request
from flask_cors import CORS
import os, json
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route("/api/users", methods=["POST"])
def users():
    try:
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        print(f"got data:\n{username}\n{password}")

        return jsonify({
            "status": "success",
            "message": f"server successfully got data: {username} and {password}"
        }), 200
    except Exception as err:
        print("error ", err)
        return jsonify({
            "status": "error",
            "message": "server failed to get data"
        }), 500

if __name__ == "__main__":
    app.run(debug=True)