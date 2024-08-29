import "./index.css"
import Button from "../Button"
import { useNavigate, useLocation } from "react-router-dom"
//TODO revisar
export default function GoBackButton() {
    const navigate = useNavigate()
    const location = useLocation()

    const handleGoBackButton = (event) => {
        event.preventDefault()

        const rootPaths = ["/feed", "/achievements", "/workouts"]

        if (!rootPaths.includes(location.pathname)) {
            navigate(-1);
        }
    }

    const rootPaths = ["/feed", "/achievements", "/workouts"]
    if (rootPaths.includes(location.pathname)) {
        return null
    }

    return (
        <Button onClick={handleGoBackButton} className="GoBackButton">
            <i className="fa-solid fa-chevron-left"></i>
        </Button>
    );
}
