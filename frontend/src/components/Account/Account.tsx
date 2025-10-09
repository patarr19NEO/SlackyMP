import "./Account.css"
import {useEffect, useState} from "react"
import OrdersList from "../OrdersList/OrdersList"
import OrdersToBeGiven from "../OrdersToBeGiven/OrdersToBeGiven"
import Completed_Orders from "../Completed_Orders/Completed_Orders"

interface HeaderProps {
    onLogout: () => void;
    isLoggedIn: boolean;
}

export default function Account({isLoggedIn, onLogout }: HeaderProps) {

    const [activeTab, setActiveTab] = useState<"orders" | "ordersToBeGiven" | "completed_Orders" | "none">("none")
    const [loading, setLoading] = useState(false)

    const currentTab = () => {
        if (activeTab === "orders") {
            return <OrdersList openCompletedOrders={() => setActiveTab("completed_Orders")} />
        } else if (activeTab === "ordersToBeGiven") {
            return <OrdersToBeGiven />
        } else if (activeTab === "completed_Orders") {
            return <Completed_Orders />
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

    const [avatarImg, setAvatarImg] = useState<string | null>(null)

    useEffect(() => {
        const fetchAvatar = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://127.0.0.1:5000/api/account/avatars", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        employee_email: localStorage.getItem("user")
                    }),
                })
                const data = await response.json()
                console.log("📡 Ответ API:", data)
                let path_to_avatar = data.avatar_img_path

                if (!path_to_avatar || path_to_avatar === "") {
                    setAvatarImg("../src/assets/default-avatar.png")
                }
                
                // Convert backend path to frontend path
                if (path_to_avatar && path_to_avatar.startsWith('../src/assets/')) {
                    // Convert "../src/assets/cat-avatar.png" to "/src/assets/cat-avatar.png"
                    path_to_avatar = path_to_avatar.replace('../', '/')
                }
                
                setAvatarImg(path_to_avatar)
            } catch (e) {
                console.log("❌ Ошибка: ", e)
            } finally {
                setLoading(false)
            }
        }
        fetchAvatar()
    }, [])


    return (
        <div className="Account">
            {/*<h1>Hi, {localStorage.getItem("user")}</h1>*/}

            <div className="workspace">
                <div className="left_pannel">
                    <div className="profile">
                        <img 
                            src={avatarImg || "..src/assets/default-avatar.png"}
                            alt="logo-avatar" 
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/default-avatar.png"
                            }} 
                        />
                        <h3>{localStorage.getItem("user")?.replace(/['"]+/g, '')}</h3>
                        {loading && <p>Loading avatar...</p>}
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