import './App.css'
import Header from "./components/Header/Header.tsx"
import EnterForm from "./components/EnterForm/EnterForm.tsx";
import Account from "./components/Account/Account.tsx"

function App() {
  var isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

  return (
    <>
        <Header />
        {isLoggedIn ? (<Account />) : (<EnterForm />)}
    </>
  )
}

export default App
