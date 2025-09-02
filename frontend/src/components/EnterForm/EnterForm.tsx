import "./EnterForm.css"

export default function EnterForm() {
    return (
        <>
            <div className="form-window">
                <div className="form">
                    <div className="form-content">
                        <h1>Enter</h1>
                        <form>
                            <input placeholder="Mail" type="text"/>
                            <input placeholder="Password" type="password"/>
                            <a href="#">Go</a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}