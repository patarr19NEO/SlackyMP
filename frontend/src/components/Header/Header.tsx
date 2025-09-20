import "./Header.css"

const date = new Date();
console.log(`${date.getHours()}:${date.getMinutes()}`)

interface HeaderProps {
    onLogout: () => void;
    isLoggedIn: boolean;
}

export default function Header({ onLogout, isLoggedIn }: HeaderProps) {
    const logout = () => {
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
            onLogout();
        }
    }

    return (
        <>
            <header>
                <h1 className="logo">Slacky</h1>
                <p>Веб-Приложения для работников ПВЗ SpackyMP</p>
                <div className="logout-btn">
                    <button onClick={logout}>LogOut</button>
                </div>
            </header>
        </>
    )
}