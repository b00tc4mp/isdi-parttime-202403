import React from 'react';
import logic from '../../logic';
import Button from '../../components/Button';
import Field from '../../components/Field';
import "./EditResultForm.css"
import useContext from "../../useContext"


export default function EditResultForm({ result, onResultEdited, onCancel }) {
    console.log("EditResultForm -> render")

    const { id: resultId, time, repetitions, weight } = result
    const { alert } = useContext()

    const handleEditResultSubmit = (event) => {
        event.preventDefault()
        const form = event.target

        const time = form.time.value && Number(form.time.value)
        const repetitions = form.repetitions.value && Number(form.repetitions.value)
        const weight = form.weight.value && Number(form.weight.value)

        try {
            logic.updateResult(resultId, time, repetitions, weight)
                .then(() => onResultEdited())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }
    return (
        <form className="EditResultForm" onSubmit={handleEditResultSubmit}>
                <Field
                    id="time"
                    type="number"
                    placeholder={time ? `Your time: ${time}'` : "Total time"}
                />
                <Field
                    id="repetitions"
                    type="number"
                    placeholder={repetitions ? `Repetitions: ${repetitions}` : "Total repetitions"}
                />
                <Field
                    id="weight"
                    type="number"
                    placeholder={weight ? `Weight: ${weight} kg` : "Total weight"}
                />

                <div className="form-buttons">
                    <Button type="submit" className="save-button">Save</Button>
                    <Button type="button" onClick={onCancel} className="cancel-button">Cancel</Button>
                </div>
        </form>
    );
}
