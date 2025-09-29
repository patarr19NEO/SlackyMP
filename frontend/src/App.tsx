import './App.css'
import Header from "./components/Header/Header.tsx"
import EnterForm from "./components/EnterForm/EnterForm.tsx";
import Account from "./components/Account/Account.tsx"
import {useState} from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

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
        <Header onLogout={handleLogOut} isLoggedIn={isLoggedIn} />
        {isLoggedIn ? (<Account/>) : (<EnterForm onLoginSuccess={handleLogIn}/>)}
    </>
  )
}

export default App
