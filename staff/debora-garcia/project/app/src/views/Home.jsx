import { useNavigate, Link, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import logic from "../logic"

import { Context } from "../useContext"

import Alert from "./.components/Alert"

import Feed from "./Feed/Feed"
import Workouts from "./Workouts/Workouts"
import Achievements from "./Achievements/Achievements"
import Header from "./.components/Header"
import Footer from "./.components/Footer"
import Heading from "../components/Heading"
import GoBackButton from "../components/GoBackButton"
import WorkoutDetail from "./Workouts/WorkoutDetails"
import ResultDetails from "./Achievements/ResultDetails"

export default function Home() {
    console.log("Home ->render")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const [currentRoute, setCurrentRoute] = useState("")

    const [message, setMessage] = useState(null)

    const handleAlertAccepted = () => setMessage(null)
    const handleMessage = message => setMessage(message)


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
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [])

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

    const handleLogout = () => {
        logic.logoutUser()

        navigate("/login")
    }
    return (
        <>
            <Context.Provider value={{ alert: handleMessage }}>
                <Header username={username} onLogout={handleLogout}>
                    <Heading level="5">{currentRoute}</Heading>
                </Header>
                <main className="main-view">
                    <Routes>
                        <Route path="/" element={<Navigate to="/workouts" />} />

                        <Route path="/feed" element={<Feed />} />

                        <Route path="/achievements" element={<Achievements />} />
                        <Route path="/achievements/results/:resultId" element={<ResultDetails />} />

                        <Route path="/workouts" element={<Workouts />} />
                        <Route path="/workouts/:workoutType" element={<WorkoutDetail />} />
                    </Routes>
                    {message && <Alert message={message} onAccept={handleAlertAccepted} />}
                </main>
                <Footer />
            </Context.Provider>
        </>
    )

}


