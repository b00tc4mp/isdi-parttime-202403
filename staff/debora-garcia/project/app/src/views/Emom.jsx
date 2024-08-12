import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import logic from "../logic"

import Button from "../components/Button"

export default function Emom() {
    const { emom } = useParams()
    const [workout, setWorkout] = useState({})

    const generateRandomWorkout = () => {
        console.log("Emom -> generateRandomWorkout")
        try {
            logic.getRandomWorkout(emom)
                .then((emomWorkout) => {
                    setWorkout(emomWorkout)
                    console.log(emomWorkout)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log("Emom -> useEffect")
        generateRandomWorkout()
    }, [emom])// workout?

    return (
        <div>
            {workout?.workoutType && <p>{workout.workoutType}</p>}
            {workout?.title && <p>{workout.title}</p>}
            {workout?.duration && <p>{workout.duration}</p>}
            <Button onClick={generateRandomWorkout} type={"button"}>Again!</Button>
        </div>
    )
}
