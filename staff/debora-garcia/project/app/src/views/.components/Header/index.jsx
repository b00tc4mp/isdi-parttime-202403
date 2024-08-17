import Button from "../../../components/Button"
import "./index.css"
import { useNavigate } from "react-router-dom"


export default function Header({ children, username, onLogout }) {
    console.log("Header -> render")
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
    }

    const handlePrintInitialLetter = (username) => {
        return username.charAt(0).toUpperCase()
    }

    return (
        <header className="Header">
            {children}
            <div className="user-logo">
                <div className="user-initial">
                    {handlePrintInitialLetter(username)}
                </div>
            </div>
            <Button onClick={handleLogout} className="logout-button">Logout</Button>
        </header>
    )
}
