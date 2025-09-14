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

ORDERS = [
    {
        "id": 1,
        "fio": "Иван Петров",
        "status": "waiting",
        "products": [{"name": "Футболка", "quantity": 2}],
        "barcode": "1234567890",
        "where": "A-15"
    },
    {
        "id": 2, 
        "fio": "Мария Сидорова",
        "status": "waiting",
        "products": [{"name": "Книга", "quantity": 1}],
        "barcode": "0987654321",
        "where": "Б-07"
    }
]

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

#api для заказов(писал не я)
@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        status_filter = request.args.get('status')
        
        if status_filter:
            filtered_orders = [order for order in ORDERS if order['status'] == status_filter]
            return jsonify(filtered_orders)
        else:
            return jsonify(ORDERS)
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Найти заказ по ID
@app.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = next((o for o in ORDERS if o['id'] == order_id), None)
    if order:
        return jsonify(order)
    else:
        return jsonify({"error": "Заказ не найден"}), 404

# Выдать заказ
@app.route('/api/orders/<int:order_id>/issue', methods=['POST'])
def issue_order(order_id):
    try:
        order = next((o for o in ORDERS if o['id'] == order_id), None)
        
        if not order:
            return jsonify({"success": False, "message": "Заказ не найден"}), 404
        
        if order['status'] == 'completed':
            return jsonify({"success": False, "message": "Заказ уже выдан"}), 400
        
        # Меняем статус заказа
        order['status'] = 'completed'
        
        return jsonify({
            "success": True,
            "message": f"Заказ №{order_id} успешно выдан",
            "order": order
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)