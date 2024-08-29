import React from 'react';
import logic from '../../logic';
import Button from '../../components/Button';
import Field from '../../components/Field';
import "./CreatePostForm.css"
import useContext from "../../useContext"


export default function CreatePostForm({ workoutId, onPostCreated }) {
    console.log("CreatePostForm -> render")
    const { alert } = useContext()

    const handleCreatePostSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const description = form.description.value
        const time = form.time.value && Number(form.time.value)
        const repetitions = form.repetitions.value && Number(form.repetitions.value)
        const weight = form.weight.value && Number(form.weight.value)

        try {

            logic.createPost(workoutId, image, description, time, repetitions, weight)
                .then(() => onPostCreated())
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
        <form className="CreatePostForm" onSubmit={handleCreatePostSubmit}>
            <div className="post-form-container">
                <Field id="image" type="text" placeholder="Upload image"></Field>
                <Field id="description" type="text" placeholder="Description"></Field>
                <Field id="time" type="number" placeholder="Time"></Field>
                <Field id="repetitions" type="number" placeholder="Total repetitions"></Field>
                <Field id="weight" type="number" placeholder="Weight"></Field>

                <div className="form-buttons-container">
                    <Button type="submit">Share</Button>
                </div>

            </div>
        </form>
    );
}
