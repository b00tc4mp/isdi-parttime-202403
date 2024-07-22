import { useState } from 'react'

import './CreatePostForm.css'

import logic from "../../logic"

import FormWithFeedback from '../../component/library/FormWithFeedback'
import View from '../../component/library/View'

import Field from '../../component/core/Field'
import Button from '../../component/core/Button'
import SubmitButton from '../../component/core/SubmitButton'

function CreatePostForm({ onCancelCreatePostClick, onPostCreated }) {
    const [message, setMessage] = useState('')

    const handleCancelCreatePostClick = () => onCancelCreatePostClick()

    const hanleCreatePostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const image = form.image.value
        const description = form.description.value

        try {
            logic.createPost(title, image, description)
                .then(() => onPostCreated())
                .catch(error =>{
                    console.error(error)

                    setMessage(error.message)
            })

        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }

    return <View className='CreatePostForm'>

        <FormWithFeedback onSubmit={hanleCreatePostSubmit} message={message}>
            <Field id='title'>Title</Field>

            <Field id='image'>Image</Field>

            <Field id='description'>Description</Field>

            <View direction='row'>
                <SubmitButton>Create</SubmitButton>

                <Button onClick={handleCancelCreatePostClick}>Cancel</Button>
            </View>

        </FormWithFeedback>

    </View>

}

export default CreatePostForm