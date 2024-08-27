import { useEffect, useState } from "react";
import logic from "../../logic"
import Heading from "../../components/Heading"
import Button from "../../components/Button";
import { Link } from "react-router-dom"

import "./ResultsList.css"
export default function ResultsList() {
    console.log("ResultsList -> Render")

    const [results, setResults] = useState([])

    useEffect(() => {
        console.log("ResultsList -> useEffect")

        loadResults()
    }, [])

    const loadResults = () => {
        try {
            logic.getAllResults()
                .then(results => {
                    setResults(results)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }
    

    return (
        <div className="ResultsList">
            <div className="ResultsList-container">
                {results.map(result => (
                    <Link key={result.id} to={`/achievements/results/${result.id}`} className="ResultsList-item">
                        <article>
                            <div className="result-header">
                                <Heading level={6} className="Heading">
                                    {result.workout.workoutType.toUpperCase()} {result.workout.title} {result.workout.duration}
                                </Heading>
                                <time>{new Date(result.date).toLocaleDateString()}</time>
                            </div>
                            <div className="result-details-container">
                                <p className="result-details">
                                    {result.time && `${result.time} min `}
                                    {result.repetitions && `${result.repetitions} reps `}
                                    {result.weight && `${result.weight} kg`}
                                </p>

                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}