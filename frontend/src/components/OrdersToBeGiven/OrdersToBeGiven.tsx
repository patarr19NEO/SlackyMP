import "./OrdersToBeGiven.css"
import { useState } from "react"
export default function OrdersToBeGiven() {
    const [orderId, setOrderId] = useState<string>("")
    const [message, setMessage] = useState("")

    const handleToBeGivenOrder = async () => {
        if (!orderId) {
            alert("Введите номер заказа!")
            return
        }

        try {
            // Get employee email from localStorage
            const employeeEmail = localStorage.getItem("user")
            if (!employeeEmail) {
                alert("❌ Ошибка: не найден email сотрудника")
                return
            }

            const response = await fetch(`http://127.0.0.1:5000/api/orders/${orderId}/issue`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ employee_email: employeeEmail })
            })

            const data = await response.json()

            if (response.ok) {
                alert(`✔️ Заказ выдан`)
                console.log("✔️ Заказ выдан")
                setOrderId("")
                setMessage("✔️ Заказ выдан")
            } else {
                alert("❌ Не найден id товара")
                setMessage("❌ Не найден ID товара")
                console.log("❌ Не найден ID товара")
            }
        } catch (err) {
            console.error(err)
            alert("❌ Ошибка при выдаче заказа")
        }
    }

    return(
        <div className="OrdersToBeGiven">
            <h1>Выдать заказ</h1>
            <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
            <h3>{message}</h3>
            <button onClick={handleToBeGivenOrder}>Выдать</button>
        </div>
    )
}