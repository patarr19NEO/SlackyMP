from flask import Flask, jsonify, request
from flask_cors import CORS
import os, json
from datetime import datetime

app = Flask(__name__)
CORS(app)

def get_orders_from_json():
    """Read orders from orders.json file"""
    try:
        orders_data = readDB("orders.json")
        return orders_data["ordinfo"]["orders"]
    except Exception as e:
        print(f"Error reading orders.json: {e}")
        return []

def authenticate_employee(email, password):
    """Authenticate employee from employees.json"""
    try:
        employees_data = readDB("employees.json")
        employees = employees_data["epinfo"]["employees"]
        
        # Search for employee with matching email and password
        for employee in employees:
            if employee["email"] == email and employee["password"] == password:
                return employee  # Return the found employee
        
        return None  # No matching employee found
    except Exception as e:
        print(f"Error reading employees.json: {e}")
        return None

logs_file = "logs.txt"

def readDB(file):
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, file)
    print(f"Reading file from: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

@app.route("/api/users", methods=["POST"])
def users():
    try:
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        print(f"got data:\n{username}\n{password}")
        with open(logs_file, "a") as file:
            file.write(f"\n[INFO] {datetime.now()}: got data:\n{username}\n{password}")

        # Use the new authentication function
        employee = authenticate_employee(username, password)
        
        if employee:
            with open(logs_file, "a") as file:
                file.write(f"\n[MESSAGE] {datetime.now()}: server successfully got data in DataBase: {username} and {password} with code 200")
            return jsonify({
                "status": "success",
                "message": f"server successfully got data in DataBase: {username} and {password}",
                "user": username,
                "employee_code": employee.get("code", "")
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
        orders = get_orders_from_json()
        return jsonify(orders)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Найти заказ по ID
@app.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    orders = get_orders_from_json()
    order = next((o for o in orders if o['id'] == order_id), None)
    if order:
        return jsonify(order)
    else:
        return jsonify({"error": "Заказ не найден"}), 404

def write_orders_to_json(orders):
    """Записывает заказы обратно в orders.json"""
    try:
        orders_data = {"ordinfo": {"orders": orders}}
        with open("orders.json", "w", encoding="utf-8") as f:
            json.dump(orders_data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Error writing to orders.json: {e}")
        return False

# Выдать заказ
@app.route('/api/orders/<int:order_id>/issue', methods=['POST'])
def issue_order(order_id):
    try:
        orders = get_orders_from_json()
        order = next((o for o in orders if o['id'] == order_id), None)
        
        if not order:
            return jsonify({"success": False, "message": "Заказ не найден"}), 404
        
        if order['status'] == 'completed':
            return jsonify({"success": False, "message": "Заказ уже выдан"}), 400
        
        # Меняем статус заказа
        order['status'] = 'completed'
        
        # Сохраняем изменения обратно в JSON файл
        if not write_orders_to_json(orders):
            return jsonify({"success": False, "message": "Ошибка сохранения"}), 500
        
        return jsonify({
            "success": True,
            "message": f"Заказ №{order_id} успешно выдан",
            "order": order
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    print(readDB("employees.json"))
    app.run(debug=True)