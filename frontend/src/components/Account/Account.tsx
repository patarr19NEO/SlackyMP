import "./Account.css"
import {useState} from "react"
import OrdersList from "../OrdersList/OrdersList"
import OrdersToBeGiven from "../OrdersToBeGiven/OrdersToBeGiven"

export default function Account() {
    const [activeTab, setActiveTab] = useState<"orders" | "ordersToBeGiven" | "none">("none")

    const currentTab = () => {
        if (activeTab === "orders") {
            return <OrdersList />
        } else if (activeTab === "ordersToBeGiven") {
            return <OrdersToBeGiven />
        } else {
            return null
        }
    }

    return (
        <div className="Account">
            {/*<h1>Hi, {localStorage.getItem("user")}</h1>*/}

            <div className="workspace">
                <div className="left_pannel">
                    <div className="tabs">
                        <a onClick={() => setActiveTab("orders")} >Заказы к выдачи</a>
                        <a onClick={() => setActiveTab("ordersToBeGiven")} >Выдать заказ</a>
                    </div>
                </div>

                <div className="current_tab">
                    {currentTab()}
                </div>
            </div>
        </div>
    )
}