import "./index.css"
import Button from "../../../components/Button"
import { Link } from "react-router-dom"

export default function Footer() {
 
    return <footer className="Footer">
        <Link to="/feed"><Button className="FooterButton"><i className="fa fa-house"></i></Button></Link>
        <Link to="/workouts"><Button className="FooterButton"><i className="fa fa-dumbbell"></i></Button></Link>
        <Link to="/achievements"><Button className="FooterButton"><i className="fa fa-ranking-star"></i></Button></Link>
    </footer>
}