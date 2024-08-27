import React from 'react';
import logic from '../../logic';
import Button from '../../components/Button';
import Field from '../../components/Field';
import "./EditResultForm.css"

export default function EditResultForm({ resultId, onResultEdited, onCancel }) {
    console.log("EditResultForm -> render")
 

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
                })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <form className="EditResultForm" onSubmit={handleEditResultSubmit}>
            <Field id="time" type="number" placeholder="Time"></Field>
            <Field id="repetitions" type="number" placeholder="Total repetitions"></Field>
            <Field id="weight" type="number" placeholder="Weight"></Field>

            <div className="form-buttons-container">
                <Button type="submit">Save</Button>
                <Button type="button" onClick={onCancel} className="cancel-button">Cancel</Button>
            </div>
        </form>
    )

}
