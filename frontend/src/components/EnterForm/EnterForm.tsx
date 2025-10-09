import "./EnterForm.css"
import {useState, useEffect} from "react";
import * as React from "react";

interface EnterFormProps {
    onLoginSuccess: () => void;
}

export default function EnterForm({ onLoginSuccess }: EnterFormProps) {
    const [mail, setMail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [code, setCode] = useState<string>("")

    const handleSubmit = async (e: React.MouseEvent) => {
        setLoading(true)
        e.preventDefault()
        if (mail === "" || password === "" || !mail.includes("@") || mail.includes(" ") || password.includes(" ")) {
            setError("❌ Invalid input!")
            setLoading(false)
            return
        }

        console.log("📫 Sent data: " + mail + " " + password)
        try {
            const response = await fetch("http://127.0.0.1:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: mail,
                    password: password,
                })
            })
            const data: any = await response.json()
            console.log("✔️ Got data: ", data)

            if (!response.ok) {
                setError(data.message || "Login failed")
                alert(data.message)
                setLoading(false)
                return // this is important too
            }

            console.log(data.message)
            setLoading(false)
            localStorage.setItem("user", data.user)
            localStorage.setItem("isLoggedIn", "true")
            onLoginSuccess()

        } catch (err: any) {
            setError(err.message)
            alert("error!: " + err.message)
            setLoading(false)
        }
    }

    const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const [defaultForm, setDefaultForm] = useState<boolean>(true)
    const [codeEnteringForm, setCodeEnteringForm] = useState<boolean>(false)

    useEffect(() => {
        setDefaultForm(true)
    }, []);

    const handleForms = () => {
        setCodeEnteringForm(true)
        setDefaultForm(false)
    }

    return (
        <>
            {defaultForm ? (
                <div className="form-window">
                    <div className="form">
                        <div className="form-content">
                            <h1>Вход</h1>
                            <form>
                                <input value={mail} onChange={handleMail} placeholder="Mail" type="email"/>
                                <input value={password} onChange={handlePassword} placeholder="Password" type="password"/>
                                <a onClick={handleForms}>Войти по кодy</a>

                                <div className="error">
                                    <p>{error}</p>
                                    <p>{!loading ? "" : "Loading..."}</p>
                                </div>

                            </form>
                            <div className="go-btn" onClick={handleSubmit}>Вперед!</div>
                        </div>
                    </div>
                </div>
            ) : codeEnteringForm ? (
                <div className="enterBy-code__form_window">
                    <div className="form-code">
                        <div className="form-code_content">
                            <h1>Вход через код</h1>
                            <form>
                                <input value={code} onChange={(e) => setCode(e.target.value)} type="password" />

                                <div className="error">
                                    <p>{error}</p>
                                    <p>{!loading ? "" : "Loading..."}</p>
                                </div>

                            </form>
                            <div className="go-btn">Вперед!</div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}