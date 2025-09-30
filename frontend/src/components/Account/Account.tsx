import "./Account.css"
import {useState} from "react"
import OrdersList from "../OrdersList/OrdersList"
import OrdersToBeGiven from "../OrdersToBeGiven/OrdersToBeGiven"

interface HeaderProps {
    onLogout: () => void;
    isLoggedIn: boolean;
}

export default function Account({isLoggedIn, onLogout }: HeaderProps) {
    //console.log(`${date.getHours()}:${date.getMinutes()}`)

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

    const logout = () => {
        const date = new Date();
        if (date.getHours() < 21) {
            if (!confirm("Рабочий день еще не закончился. Вы уверены, что хотите выйти?")) {
                return
            } else {
                localStorage.removeItem("user")
                localStorage.removeItem("isLoggedIn")
                onLogout();
            }
        } else {
            localStorage.removeItem("user")
            localStorage.removeItem("isLoggedIn")
            onLogout()
        }
    }

    return (
        <div className="Account">
            {/*<h1>Hi, {localStorage.getItem("user")}</h1>*/}

            <div className="workspace">
                <div className="left_pannel">
                    <div className="profile">
                        <img src="../src/assets/cat-avatar.png" alt="logo-avatar"/>
                        <h3>{localStorage.getItem("user")?.replace(/['"]+/g, '')}</h3>
                    </div>
                    <div className="tabs">
                        <a onClick={() => setActiveTab("orders")} >Заказы к выдачи</a>
                        <a onClick={() => setActiveTab("ordersToBeGiven")} >Выдать заказ</a>
                    </div>
                    <div className="logout_button">
                        <button onClick={logout}>LogOut</button>
                    </div>
                </div>

                <div className="current_tab">
                    {currentTab()}
                </div>
            </div>
        </div>
    )
}