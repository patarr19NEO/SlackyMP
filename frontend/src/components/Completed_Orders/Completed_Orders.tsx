import {useEffect, useState} from "react"
import "./Completed_Orders.css"

interface Order {
    id: number
    fio: string
    name: string
    quantity: number
    status: string
    where: string
}

export default function CompletedOrders() {
    const [completedOrders, setCompletedOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<string>("")
    const [isNoOrders, setIsNoOrders] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading("Loading...")
            try {
                const empName = localStorage.getItem("user")
                const response = await fetch("http://127.0.0.1:5000/api/orders", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ employee_email: empName })
                })
                console.log("📡 Ответ API:", response.status)

                const data = await response.json()
                console.log("📦 Какие заказы:", data)

                if (response.ok && Array.isArray(data)) {
                    const completed: Order[] = data.filter(order => order.status === "completed")
                    console.log("✅ Выполненные заказы:", completed)
                    
                    if (completed.length <= 0) {
                        setIsNoOrders(true)
                        setCompletedOrders([])
                    } else {
                        setIsNoOrders(false)
                        setCompletedOrders(completed)
                    }
                } else {
                    console.error("❌ Ошибка API или неверные данные:", data)
                    setIsNoOrders(true)
                    setCompletedOrders([])
                }
            } catch (err) {
                console.error("❌ Не получилось загрузить заказы с сервера:", err)
                setIsNoOrders(true)
                setCompletedOrders([])
            } finally {
                setLoading("")
            }
        }
        fetchData()
    }, [])

    return (
        <div className="CompletedOrders">
            <h1 className="header-h1">Выполненные заказы</h1>
            {loading && <p>{loading}</p>}
            <div className="alltables">
                <div className="table-items">
                    {isNoOrders ? (
                        <h1 className="noOrders-h1">Нетy выполненных заказов 😭</h1>
                    ) : (
                        <div className="table-items">
                            <h2>№</h2>
                            <h2>ФИО</h2>
                            <p>Товар(кол-во)</p>
                            <h2>Статус</h2>
                            <h2>Место</h2>
                        </div>
                    )}
                </div>
                <div className="table">
                    {
                        completedOrders.map(order => (
                            <div className="order-card" key={order.id}>
                                <h3 className="order-id">{order.id}</h3>
                                <p className="order-fio">{order.fio}</p>
                                <p className="product(quan-ty)">{order.name}({order.quantity})</p>
                                <p className="order-status">{order.status}</p>
                                <p className="where-order-is">{order.where}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
