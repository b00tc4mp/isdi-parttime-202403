import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logic from "../../logic"
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import EditResultForm from './EditResultForm'
import "./ResultDetails.css"
export default function ResultDetails() {

    const [result, setResult] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { resultId } = useParams()
    const navigate = useNavigate()

    const loadResult = () => {
        try {
            logic.getResult(resultId)
                .then(result => {
                    setResult(result)
                    console.log(result)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log("ResultDetails -> useEffect")
        loadResult()
    }, [resultId])

    const handleDeleteResult = () => {
        try {
            logic.deleteResult(result.id)
                .then(() => {
                    navigate(-1)
                })

                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })

        } catch (error) {
            alert(error.message)
        }
    }

    const handleEditResult = () => {
        setIsEditing(true)
        setIsMenuOpen(false)
    }

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleResultEdited = () => {
        setIsEditing(false)
        loadResult()
    }
    const handleCancelEdit = () => {
        setIsEditing(false)
    }

    return (
        <div className="result-details-container">
            <div className="result-card">
                <div className="result-header">
                    <h6 className="result-title">{result?.workout.workoutType.toUpperCase()} {result?.workout.duration}</h6>
                    {!isEditing && !isMenuOpen && (
                        <Button className="action-button" onClick={handleToggleMenu}>⋮</Button>
                    )}
                </div>
                <h6 >{result?.workout.title}</h6>
                <ul>
                    {result?.workout.movements.map((movement, index) => (
                        <li key={index} className="text-base">{movement.quantity} {movement.name}</li>
                    ))}
                </ul>

                <div className="result-details">
                    <h6 >Result</h6>
                    <p >{result?.time && `Time: ${result.time}'`}</p>
                    <p >{result?.repetitions && `Reps: ${result.repetitions} `}</p>
                    <p >{result?.weight && `Weight: ${result.weight} kg`}</p>
                </div>
            </div>

            {isMenuOpen && (
                <div className="action-menu">
                    <Button onClick={handleEditResult}>Edit</Button>
                    <Button onClick={handleDeleteResult}>Delete</Button>
                    <Button onClick={handleToggleMenu}>Cancel</Button>
                </div>
            )}
            {isEditing && <EditResultForm resultId={result.id} onResultEdited={handleResultEdited} onCancel={handleCancelEdit} />}
        </div>
    );
}