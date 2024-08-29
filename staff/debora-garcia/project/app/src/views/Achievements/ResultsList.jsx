import { useEffect, useState } from "react"
import logic from "../../logic"
import useContext from "../../useContext"

import Heading from "../../components/Heading"
import { Link } from "react-router-dom"
import Filter from "./Filter"

import "./ResultsList.css"

export default function ResultsList() {
    console.log("ResultsList -> Render")
    const { alert } = useContext()

    const [results, setResults] = useState([])
    const [filteredResults, setFilteredResults] = useState([])


    useEffect(() => {
        console.log("ResultsList -> useEffect")
        loadResults()
    }, [])

    const loadResults = () => {
        try {
            logic.getAllResults()
                .then(results => {
                    setResults(results)
                    setFilteredResults(results)
                })
                .catch(error => {
                    console.error(error)

                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
            setFilteredResults(results)
        } else {
            const filtered = results.filter(result =>
                result.workout.workoutType.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredResults(filtered)
        }
    }

    return (
        <div className="ResultsList">
            <Filter onSearch={handleSearch} />

            <div className="ResultsList-container">
                {filteredResults.length > 0 ? (
                    filteredResults.map(result => (
                        <Link key={result.id} to={`/achievements/results/${result.id}`} className="ResultsList-item">
                            <article>
                                <div className="result-header">
                                    <Heading level={6} className="Heading">
                                        {result.workout.workoutType.toUpperCase()} {result.workout?.duration && ` ${result.workout.duration}'`} {result.workout.title && `"${result.workout.title}"`} 
                                    </Heading>
                                    <time>{new Date(result.date).toLocaleDateString()}</time>
                                </div>
                                <div className="result-details-container">
                                    <p className="result-details">
                                        {result.time && `${result.time} min `}
                                        {(result.repetitions || result.repetitions === 0) && `${result.repetitions} reps `}
                                        {(result.weight || result.weight === 0) && `${result.weight} kg`}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    )
}
