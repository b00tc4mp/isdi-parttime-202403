import "./index.css"
import Button from "../../../components/Button"
import { useNavigate, Link, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Footer() {
    const location = useLocation()
    const [currentRoute, setCurrentRoute] = useState("")
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("feed")) {
            setCurrentRoute("FEED")
        } else if (path.includes("achievements")) {
            setCurrentRoute("ACHIEVEMENTS")
        } else if (path.includes("workouts")) {
            setCurrentRoute("WORKOUTS")
        } else {
            setCurrentRoute("");
        }
    }, [location]);

    return (
        <footer className="Footer">
            <Link to="/feed">
                <Button className={`FooterButton ${currentRoute === "FEED" ? "active" : ""}`}>
                    <div className={`FooterIcon ${currentRoute === "FEED" ? "active" : ""}`}>
                        <i className="fa fa-house"></i>
                    </div>
                </Button>
            </Link>
            <Link to="/workouts">
                <Button className={`FooterButton ${currentRoute === "WORKOUTS" ? "active" : ""}`}>
                    <div className={`FooterIcon ${currentRoute === "WORKOUTS" ? "active" : ""}`}>
                        <i className="fa fa-dumbbell"></i>
                    </div>
                </Button>
            </Link>
            <Link to="/achievements">
                <Button className={`FooterButton ${currentRoute === "ACHIEVEMENTS" ? "active" : ""}`}>
                    <div className={`FooterIcon ${currentRoute === "ACHIEVEMENTS" ? "active" : ""}`}>
                        <i className="fa fa-ranking-star"></i>
                    </div>
                </Button>
            </Link>
        </footer>
    );
}