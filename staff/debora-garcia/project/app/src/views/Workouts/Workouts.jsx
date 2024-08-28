import { Link, useParams } from "react-router-dom"
import Button from "../../components/Button"
import WorkoutDetails from "./WorkoutDetails"
import "./Workouts.css"

export default function Workouts() {
    console.log("Workouts ->render")
    const { workoutType } = useParams(); // Captura el tipo de workout desde la URL

    return (
        <div className="Workouts">
            {!workoutType ? (
                <div className="button-container">
                    <Link to="/workouts/emom"><Button>EMOM</Button></Link>
                    <Link to="/workouts/for-time"><Button>FOR TIME</Button></Link>
                    <Link to="/workouts/amrap"><Button>AMRAP</Button></Link>
                    <Link to="/workouts/benchmark"><Button>BENCHMARK</Button></Link>
                </div>
            ) : (
                <div>
                    <WorkoutDetails />
                </div>
            )}
        </div>
    );
}