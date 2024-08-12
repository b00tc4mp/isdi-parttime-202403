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
            <div className="flex flex-wrap items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full text-white text-xl font-bold">
                    {handlePrintInitialLetter(username)}
                </div>
            </div>
            <Button onClick={handleLogout} className="logout-button">Logout</Button>
        </header>
    )
}
