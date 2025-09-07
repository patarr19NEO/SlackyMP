import './App.css'
import Header from "./components/Header/Header.tsx"
import EnterForm from "./components/EnterForm/EnterForm.tsx";
import Account from "./components/Account/Account.tsx"
import {useState} from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const handleLogIn = () => {
      setIsLoggedIn(true)
  }

  return (
    <>
        <Header />
        {isLoggedIn ? (<Account />) : (<EnterForm isSuccess={handleLogIn} />)}
    </>
  )
}

export default App
