import "./OrdersList.css"
import {useState, useEffect} from "react"

export default function OrdersList() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState<string>("")
    const [isNoOrders, setIsNoOrders] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading("Loading...")
            try {
                const empName = localStorage.getItem("user")
                console.log("🔍 Сотрудники в LocalStorage:", empName)
                console.log("🔥 Вызываем API...")
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
                    // Filter only waiting orders
                    var waiting = data.filter(order => order.status === "waiting")
                    console.log("⏳ Фильтрованные по ожиданию:", waiting)
                    console.log("📊 Количество ожидающих заказов:", waiting.length)
                    
                    if (waiting.length <= 0) {
                        setIsNoOrders(true)
                        setOrders([])
                    } else {
                        setIsNoOrders(false)
                        setOrders(waiting)
                    }
                } else {
                    console.error("❌ Ошибка API или неверные данные:", data)
                    setIsNoOrders(true)
                    setOrders([])
                }
            } catch (err) {
                console.error("❌ Не получилось закрузить заказы с сервера:", err)
                setLoading("")
            } finally {
                setLoading("")
            }
        }
        fetchData()
    }, [])

    return(
        <div className="OrdersList">
            <h1 className="header-h1">Заказы к выдаче</h1>
            <button>Показать выполненные заказы</button>
            {loading}
            <div className="alltables">
                <div className="table-items">
                    {isNoOrders ? (<h1 className="noOrders-h1">Нету заказов😭</h1>) : (<div className="table-items">
                        <h2>№</h2>
                        <h2>ФИО</h2>
                        <p>Товар(кол-во)</p>
                        <h2>Статус</h2>
                        <h2>Место</h2>
                    </div>)}
                </div>
                <div className="table">
                    {
                        orders.map(order => (
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