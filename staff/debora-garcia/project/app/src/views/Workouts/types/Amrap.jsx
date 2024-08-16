import { useNavigate, Link, Routes, Route, useParams } from "react-router-dom"
import { useState, useEffect,  } from "react"
import logic from "../logic"

import Button from "../components/Button"

export default function Amrap() {
    const { amrap } = useParams()
    const [workout, setWorkout] = useState({})

    useEffect(() => {
        console.log("Benchmark ->render")
        try {
            logic.getRandomWorkout(amrap)
                .then((amrapkWorkout) => {
                    setWorkout(amrapkWorkout)
                    console.log(amrapkWorkout)
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
    );
}

