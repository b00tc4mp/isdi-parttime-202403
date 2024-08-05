import "./index.css"
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
    const navigate = useNavigate()

    const handleGoBackButton = (event) => {
        event.preventDefault()
        navigate(-1)
        
    }

    return <Button onClick={handleGoBackButton} className="GoBackButton">
        <i className="fa-solid fa-arrow-left-long"></i>
    </Button>

}