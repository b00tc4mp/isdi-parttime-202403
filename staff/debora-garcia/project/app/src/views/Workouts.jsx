import { useNavigate, Link, Routes, Route, useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import logic from "../logic"

import Button from "../components/Button"
import Emom from './Emom';
import ForTime from './ForTime';
import Amrap from './Amrap';
import Benchmark from './Benchmark'
import WorkoutDetails from "./WorkoutDetails"

//TODO alert & use context
//TODO usar Link de react-router-dom para reacer los botones del footer
export default function Workouts() {
    console.log("Workouts ->render")
    const { workoutType } = useParams(); // Captura el tipo de workout desde la URL
    const workout = {};

    return (
        <>
            {!workoutType ? (
                <div className="button-container">
                    <Link to="/workouts/emom"><Button>EMOM</Button></Link>
                    <Link to="/workouts/for-time"><Button>FOR TIME</Button></Link>
                    <Link to="/workouts/amrap"><Button>AMRAP</Button></Link>
                    <Link to="/workouts/benchmark"><Button>BENCHMARK</Button></Link>
                </div>
            ) : (
                <div className="workout-details">
                    <WorkoutDetails workoutType={workoutType} workout={workout} />
                </div>
            )}
        </>
    );
}