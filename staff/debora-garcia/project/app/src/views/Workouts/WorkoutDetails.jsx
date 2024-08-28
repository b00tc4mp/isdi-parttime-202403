import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logic from "../../logic"
import Button from '../../components/Button';
import "./WorkoutDetails.css"
import CreatePostForm from './CreatePostForm'
import { useNavigate } from 'react-router-dom';

export default function WorkoutDetail() {
    const [workout, setWorkout] = useState({})
    const { workoutType } = useParams()

    const [view, setView] = useState("")
    const navigate = useNavigate()

    //const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

    const generateRandomWorkout = () => {
        console.log(`Generating ${workoutType} workout`);

        try {
            logic.getRandomWorkout(workoutType)
                .then((workout) => {
                    setWorkout(workout)
                    console.log(workout)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    useEffect(() => {
        generateRandomWorkout();
    }, [workoutType])

    const handleSaveClick = () => {
        console.log("Saving post...");
        setView("create-post");
    }
    const handlePostCreated = () => {
        //setPostListRefreshStamp(Date.now());

        setView("")
        navigate("/feed")

    }
    return (
        <div className="WorkoutDetails">
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
            <div className="buttons-container">
                <Button onClick={generateRandomWorkout} type="button">Again!</Button>

                <Button onClick={handleSaveClick} type="button">Save</Button>

            </div>
            {view === "create-post" && <CreatePostForm workoutId={workout.id} onPostCreated={handlePostCreated} />}

        </div>
    )

}
