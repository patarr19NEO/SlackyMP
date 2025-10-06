import "./OrdersToBeGiven.css"
import { useState } from "react"
export default function OrdersToBeGiven() {
    const [orderId, setOrderId] = useState<string>("")

    const handleToBeGivenOrder = async () => {
        if (!orderId) {
            alert("Введите номер заказа!")
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/orders/${orderId}/issue`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json

            if (response.ok) {
                alert(`Заказ выдан`)
                setOrderId("")
            } else {
                alert("Не найден id товара")
            }
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <div className="OrdersToBeGiven">
            <h1>Выдать заказ</h1>
            <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
            <button onClick={handleToBeGivenOrder}>Выдать</button>
        </div>
    )
}