import "./EnterForm.css"
import {useState} from "react";
import * as React from "react";

export function EnterForm() {
    const [mail, setMail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const handleSubmit = (e: React.MouseEvent) => {
        setLoading(true)
        e.preventDefault()
        if (mail === "" || password === "" || !mail.includes("@")) {
            setError("Invalid input!")
            setLoading(false)
            return
        }

        alert(mail + " " + password)

        setLoading(true)
        try {
            fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        } catch (err: any) {
            setError(err)
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