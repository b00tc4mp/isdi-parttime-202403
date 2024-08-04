import { useNavigate, Link } from "react-router-dom"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Heading from "../components/Heading"

export default function Feed() {
    console.log("Feed ->render")

    const navigate = useNavigate()

    const handleGoToFeedClick = () => {
        navigate("/feed")
    }

    const handleGoToWorkoutClick = () => {
        navigate("/workouts")
    }

    const handleGoToAchievementClick = () => {
        navigate("/achievements")
    }

    return <>
        <Header>
            <Heading level="1">FEED</Heading>
            <Heading level="1">USERNAME</Heading>
        </Header>
        <Footer goToFeedClick={handleGoToFeedClick} goToWorkoutClick={handleGoToWorkoutClick} goToAchievementClick={handleGoToAchievementClick} />
    </>
}