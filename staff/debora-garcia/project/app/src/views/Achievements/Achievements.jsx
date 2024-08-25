import { useParams } from "react-router-dom"

import ResultsList from "./ResultsList"
import ResultDetails from "./ResultDetails"
import "./Achievements.css"
export default function Achievements() {
    console.log("Achievements ->render")

    const { resultId } = useParams()
    return (
        <div className="achievements-container">
            {resultId ? (
                <ResultDetails />
            ) : (
                <ResultsList />
            )}
        </div>
    )


}

