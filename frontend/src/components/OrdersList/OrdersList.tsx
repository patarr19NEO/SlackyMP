import "./OrdersList.css"
import {useState, useEffect} from "react"

export default function OrdersList() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            setLoading("Loading...")
            try {
                const response = await fetch("http://127.0.0.1:5000/api/orders") // create backend later 
                const data = await response.json()
                var waiting = data.filter(order => order.status === "waiting")
                setOrders(waiting)
            } catch (err) {
                console.error("Failed to load orders from database")
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
            {loading}
                <div className="table-items">
                    <h2>№</h2>
                    <h2>ФИО</h2>
                    <h2>Статус</h2>
                    <h2>Место</h2>
                </div>
            <div className="table">
                {
                    orders.map(order => (
                        <div className="order-card" key={order.id}>
                            <h3 className="order-id">{order.id}</h3>
                            <p className="order-fio">{order.fio}</p>
                            <p className="order-status">{order.status}</p>
                            <p className="where-order-is">{order.where}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}