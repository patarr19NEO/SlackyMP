import "./EnterForm.css"
import {useState} from "react";
import * as React from "react";

interface EnterFormProps {
    onLoginSuccess: () => void;
}

export default function EnterForm({ onLoginSuccess }: EnterFormProps) {
    const [mail, setMail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const handleSubmit = async (e: React.MouseEvent) => {
        setLoading(true)
        //setError(false)
        e.preventDefault()
        if (mail === "" || password === "" || !mail.includes("@") || mail.includes(" ") || password.includes(" ")) {
            setError("Invalid input!")
            setLoading(false)
            return
        }

        console.log("Sent data: " + mail + " " + password)
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
            const data: any = await response.json() // mistake was here
            console.log("got data: ", data)

            if (!response.ok) {
                setError(data.message || "Login failed")
                alert(data.message)
                setLoading(false)
                return // this is important too
            }

            alert(data.message)
            setLoading(false)
            localStorage.setItem("user", JSON.stringify(data.user))
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

    return (
        <>
            <div className="form-window">
                <div className="form">
                    <div className="form-content">
                        <h1>Enter</h1>
                        <form>
                            <input value={mail} onChange={handleMail} placeholder="Mail" type="email"/>
                            <input value={password} onChange={handlePassword} placeholder="Password" type="password"/>
                            <div className="error">
                                <p>{error}</p>
                                <p>{!loading ? "" : "Loading..."}</p>
                            </div>
                            <a onClick={handleSubmit}>Go</a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}