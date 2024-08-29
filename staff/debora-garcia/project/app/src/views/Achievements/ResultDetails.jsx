import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logic from "../../logic"
import useContext from "../../useContext"


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
    const { alert } = useContext()

    const loadResult = () => {
        try {
            logic.getResult(resultId)
                .then(result => {
                    setResult(result)

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
            console.error(error)
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
        <div className="ResultDetails">
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
                    <p>{result?.time && `Time: ${result.time}'`}</p>
                    <p>{(result?.repetitions || result?.repetitions === 0) && `Reps: ${result.repetitions} `}</p>
                    <p>{(result?.weight || result?.weight === 0) && `Weight: ${result.weight} kg`}</p>

                </div>
            </div>

            {isMenuOpen && (
                <div className="action-menu">
                    <Button onClick={handleEditResult}>Edit</Button>
                    <Button onClick={handleDeleteResult}>Delete</Button>
                    <Button onClick={handleToggleMenu}>Cancel</Button>
                </div>
            )}
            {isEditing && (
                <EditResultForm
                    result={{ id: result.id, time: result.time, repetitions: result.repetitions, weight: result.weight }}
                    onResultEdited={handleResultEdited}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}