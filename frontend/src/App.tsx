import './App.css'
import Header from "./components/Header/Header.tsx"
import EnterForm from "./components/EnterForm/EnterForm.tsx"
import Account from "./components/Account/Account.tsx"
import {useState, useEffect} from "react"

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const loggedStatus = localStorage.getItem("isLoggedIn")
            console.log(localStorage.getItem("user"), localStorage.getItem("isLoggedIn"))
            setIsLoggedIn(loggedStatus === "true")
        }
    }, []);

  const handleLogOut = () => {
      setIsLoggedIn(false)
      localStorage.removeItem("user")
      localStorage.removeItem("isLoggedIn")
  }

  const handleLogIn = () => {
      setIsLoggedIn(true)
  }

  return (
    <>
        {isLoggedIn ? null : (<Header/>)}
        {isLoggedIn ? (<Account onLogout={handleLogOut} isLoggedIn={isLoggedIn}/>) : (<EnterForm onLoginSuccess={handleLogIn}/>)}
    </>
  )
}

export default App
