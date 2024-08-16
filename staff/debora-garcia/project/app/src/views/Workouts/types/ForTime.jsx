import { useNavigate, Link, Routes, Route, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import logic from "../logic"

import Button from "../components/Button"

export default function ForTime() {
    const params = useParams()
    const forTime = params['for-time']

    const [workout, setWorkout] = useState({})

    useEffect(() => {
        console.log("ForTime ->render")
        try {
            logic.getRandomWorkout(forTime)
                .then((forTimekWorkout) => {
                    setWorkout(forTimekWorkout)
                    console.log(forTimekWorkout)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    return (
        <div>
            {workout?.workoutType && <p>{workout.workoutType}</p>}
            {workout?.title && <p>{workout.title}</p>}
            {workout?.duration && <p>{workout.duration}</p>}
        </div>
    )
}
