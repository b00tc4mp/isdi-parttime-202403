import { useEffect, useState } from "react";
import logic from "../../logic"
import Heading from "../../components/Heading"
import Button from "../../components/Button";

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
            logic.getResults()
                .then(results => {
                    setResults(results)
                    console.log(results)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeleteResult = (result) => {
        try {
            logic.deleteResult(result.id)
                .then(() => loadResults())
                .catch(error => alert(error.message))

        } catch (error) {
            alert
        }
    }
    
    return <div className="ResultsList">
        <div className="ResultsList-container">
            {results.map(result => <article key={result.id}>
                <div className="result-header">
                    <Heading level={6} className="Heading">{result.workout.workoutType.toUpperCase()} {result.workout.title}{result.workout.duration}</Heading>
                    <time>{new Date(result.date).toLocaleDateString()}</time>
                </div>
                <div className="result-details-container">
                    <p className="result-details">
                        {result.time && `${result.time} min `}
                        {result.repetitions && `${result.repetitions} reps `}
                        {result.weight && `${result.weight} kg`}
                    </p>
                    <div className="action-button">
                        <Button onClick={() => handleDeleteResult(result)}>✖️</Button>
                        <Button onClick={() => handleEditResult(result)}>🖋️</Button>

                    </div>
                </div>

            </article>)}
        </div>
    </div>
}