import { useState } from 'react'
import postLogic from '../../postLogic'
import './CreatePostForm.css'

import Button from '../../components/core/Button'
import Field from '../../components/core/Field'
import FieldWithTextArea from '../../components/core/FieldWithTextArea'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'

function CreatePostForm({ onCancelCreatePostClick, onPostCreated }) {
    const [message, setMessage] = useState('')

    const handleCancelCreatePostClick = () => onCancelCreatePostClick()

    const handleCreatedPost = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const image = form.image.value
        const description = form.description.value

        try {
            postLogic.createPost(title, image, description, error => {
                if (error) {
                    console.error(error)

                    setMessage(error.message)

                    return
                }

                onPostCreated()
            })
        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }

    return <FormWithFeedback className='CreatePostForm' onSubmit={handleCreatedPost} message={message}>

        <Field id='title' type='text' placeholder='title'>Title</Field>

        <Field id='image' type='text' placeholder='image'>Image</Field>

        <FieldWithTextArea id='description' type='text' placeholder='description'>Description</FieldWithTextArea>

        <div className='divButton'>
            <Button type='button' onClick={handleCancelCreatePostClick}>Cancel</Button>
            <SubmitButton >Create</SubmitButton>
        </div>
        {/* <p class='Feedback'>image is not valid, please, correct it</p> */}
    </FormWithFeedback>
}

export default CreatePostForm