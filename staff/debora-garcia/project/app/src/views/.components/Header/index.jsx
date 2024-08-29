import Button from "../../../components/Button"
import "./index.css"
import { useNavigate } from "react-router-dom"
import GoBackButton from "../../../components/GoBackButton"


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
            <div className="path-name">
                {children}
            </div>
            <GoBackButton />

            <div className="user-info">
                <div className="user-logo">
                    <div className="user-initial">
                        {handlePrintInitialLetter(username)}
                    </div>
                </div>
                <Button onClick={handleLogout} className="logout-button">
                    <i class="fa-solid fa-arrow-right-from-bracket "></i>
                </Button>
            </div>
        </header>
    )
}
