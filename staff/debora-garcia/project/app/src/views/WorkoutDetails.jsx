import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logic from "../logic"
import Button from '../components/Button';
import "./WorkoutDetails.css"

export default function WorkoutDetail() {
    const [workout, setWorkout] = useState({})
    const { workoutType } = useParams()

    const generateRandomWorkout = () => {
        console.log(`Generating ${workoutType} workout`);

        try {
            logic.getRandomWorkout(workoutType)
                .then((workout) => {
                    setWorkout(workout)
                    console.log(workout)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        generateRandomWorkout();
    }, [workoutType])

    return (
        <div className="workout-details">
            {workout?.workoutType && (
                <p>
                    {workout.workoutType.toUpperCase()}
                    {workout?.duration && ` ${workout.duration} min.`}
                </p>
            )}
            {workout?.title && <p>{workout.title}</p>}
            
            {workout?.movements && workout.movements.map((movement, index) => (
                <div key={index}>
                    <p> {movement.quantity} {movement.name} {movement.weight}{movement.units}</p>
                </div>
            ))}
            <Button onClick={generateRandomWorkout} type="button">Again!</Button>
        </div>
    )

}
 