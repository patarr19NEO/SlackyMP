import "./Account.css"

export default function Account() {

    return (
        <div className="Account">
            <h1>Hi, {localStorage.getItem("user")}</h1>
            <div className="main-buttons">
                <a>Заказы к выдачи</a>
                <a>Выдать заказ</a>
            </div>
        </div>
    )
}