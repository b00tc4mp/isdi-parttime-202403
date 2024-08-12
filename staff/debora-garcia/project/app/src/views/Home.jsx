import { useNavigate, Link, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import logic from "../logic"

import Feed from "./Feed"
import Workouts from "./Workouts"
import Achievements from "./Achievements"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Heading from "../components/Heading"
import GoBackButton from "../components/GoBackButton"
import WorkoutDetail from "./WorkoutDetails"

import Emom from "./Emom"
import Amrap from "./Amrap"
import Benchmark from "./Benchmark"
import ForTime from "./ForTime"

export default function Home() {
    console.log("Home ->render")
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

    const handleLogout = () => {
        logic.logoutUser()
        navigate("/login")
    }

    return (
        <>
        <Header username={username} onLogout={handleLogout}>
            <Heading level="1">ROUTE</Heading>
        </Header>
        <GoBackButton />
        <main>
            <Routes>
                <Route path="/" element={<Navigate to="/workouts" />} />

                <Route path="/feed" element={<Feed />} />

                <Route path="/achievements" element={<Achievements />} />

                <Route path="/workouts" element={<Workouts />} />
                <Route path="/workouts/:workoutType" element={<WorkoutDetail />} />


            </Routes>
        </main>
        <Footer />
        </>
    )

}





/*  <Route path="/workouts/emom/:emom" element={<Emom />} />
 <Route path="/workouts/amrap/:amrap" element={<Amrap />} />
 <Route path="/workouts/benchmark/:benchmark" element={<Benchmark />} />
 <Route path="/workouts/for-time/:for-time" element={<ForTime />} />
 */