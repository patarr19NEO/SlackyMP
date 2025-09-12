import "./Header.css"

interface HeaderProps {
    onLogout: () => void;
    isLoggedIn: boolean;
}

export default function Header({ onLogout, isLoggedIn }: HeaderProps) {
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("isLoggedIn")
        onLogout(); // Вызываем функцию из App.tsx
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