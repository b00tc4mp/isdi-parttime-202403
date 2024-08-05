import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import logic from "../logic"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Heading from "../components/Heading"
import Button from "../components/Button"
import GoBackButton from "../components/GoBackButton"

//TODO alert & use context
//TODO usar Link de react-router-dom para reacer los botones del footer
export default function Workouts({ onUserLoggedOut }) {
    console.log("Workouts ->render")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)


    useEffect(() => {
        console.log("Home -> useEffect")
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

    const handleLogout = () => {
        logic.logoutUser()
        //navigate("/login")
        onUserLoggedOut()

    }
    const handlePrintInitialLetter = (username) => {
        return username.charAt(0).toUpperCase()
    }

    return <form>
        <Header>
            <Heading level="1">WORKOUT</Heading>
            <div>
                <div className="flex flex-wrap items-center justify-center w-12 h-12 bg-gray-300 rounded-full text-white text-xl font-bold">
                    {handlePrintInitialLetter(username)}
                </div>
            </div>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <GoBackButton />
        <div className="button-container">
            <Button onClick={handleGoToAchievementClick}>EMOM</Button>
            <Button>FOR TIME</Button>
            <Button>AMRAP</Button>
            <Button>BENCHMARK</Button>
        </div>
        <Footer goToFeedClick={handleGoToFeedClick} goToWorkoutClick={handleGoToWorkoutClick} goToAchievementClick={handleGoToAchievementClick} />
    </form>
}