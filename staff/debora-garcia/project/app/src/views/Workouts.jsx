import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import logic from "../logic"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Heading from "../components/Heading"
import Button from "../components/Button"

export default function Workouts() {
    console.log("Workouts ->render")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Home -> useEffect")
        // setTimeout(() => {
        try {
            logic.getUsername()
                .then((username) => {
                    console.log("Home -> setUsername")

                    setUsername(username)
                })
                .catch(error => {
                    console.error(error)

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
        // }, 10000)
    }, [])

    const handleGoToFeedClick = () => {
        navigate("/feed")
    }

    const handleGoToWorkoutClick = () => {
        navigate("/workouts")
    }

    const handleGoToAchievementClick = () => {
        navigate("/achievements")
    }

    return <form>
        <Header>
            <Heading level="1">WORKOUT</Heading>
            <Heading level="1">{username}</Heading>
        </Header>
        <div className="button-container">
            <Button>EMOM</Button>
            <Button>FOR TIME</Button>
            <Button>AMRAP</Button>
            <Button>BENCHMARK</Button>
        </div>
        <Footer goToFeedClick={handleGoToFeedClick} goToWorkoutClick={handleGoToWorkoutClick} goToAchievementClick={handleGoToAchievementClick} />
    </form>
}