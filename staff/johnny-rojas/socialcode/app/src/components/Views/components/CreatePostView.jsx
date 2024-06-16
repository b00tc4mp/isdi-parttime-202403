import { useState } from 'react'

import './CreatePostView.css'

import logic from '../../../logic'

import Field from '../../core/Field'
import Button from '../../core/Button'
import SubmitButton from '../../core/SubmitButton'

import FormWithFeedback from '../../library/FormWithFeedback'
import View from '../../library/View'

function CreatePostForm({ onCancelCreatePostClick, onPostCreated }) {
    
    const [message, setMessage] = useState('')

    const handleCancelCreatePostClick = () => onCancelCreatePostClick()

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const image = form.image.value
        const description = form.description.value

        try {
            logic.createPost(title, image, description, error => {
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

    return <View className="CreatePostForm">
        <FormWithFeedback onSubmit={handleCreatePostSubmit} message={message}>
            <Field id="title" placeholder={'Title'}></Field>
            <Field id="image" placeholder={'Image'}></Field>
            <Field id="description" placeholder={'Description'}></Field>

            <div className='optionsNewPost'>
                <SubmitButton className="ButtonConfirm">Create</SubmitButton>
                <Button className="ButtonCancel" onClick={handleCancelCreatePostClick}>Cancel</Button>
            </div>
        </FormWithFeedback>
    </View>
}

export default CreatePostForm