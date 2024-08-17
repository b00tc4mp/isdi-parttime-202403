import "./index.css"
import Button from "../../../components/Button"
import { Link } from "react-router-dom"

export default function Footer() {

    return <footer className="Footer">
        <Link to="/feed">
            <Button className="FooterButton">
                <div className="FooterIcon">
                    <i className="fa fa-house"></i>
                </div>
            </Button>
        </Link>
        <Link to="/workouts"><Button className="FooterButton"><div className="FooterIcon"><i className="fa fa-dumbbell"></i></div></Button></Link>
        <Link to="/achievements"><Button className="FooterButton"><div className="FooterIcon"><i className="fa fa-ranking-star "></i></div></Button></Link>
    </footer>
}