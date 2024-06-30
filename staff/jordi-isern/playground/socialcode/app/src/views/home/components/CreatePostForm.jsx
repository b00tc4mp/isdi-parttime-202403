import { useEffect, useRef, useState } from 'react'

import './CreatePostForm.css'

import logic from '../../../logic'

import Field from '../../../Components/Core/Field';
import Button from '../../../Components/Core/Button';
import SubmitButton from '../../../Components/Core/SubmitButton';

import FormWithFeedback from '../../../Components/Library/FormWithFeedback';
import View from '../../../Components/Library/View';

function CreatePostForm({ onCancelCreatePostClick, onPostCreated }) {
    console.log('CreatePostForm -> render')

    const [message, setMessage] = useState('')

    const elemeantHandle = useRef()

    const handleCancelCreatePostClick = () => onCancelCreatePostClick()

    useEffect(() => {
        if(elemeantHandle.current){
            elemeantHandle.current.scrollIntoView({behavior: 'smooth', block :'end' })
        }
    })
    

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

    return <div className='"BackgorundCreatePostForm' ref={elemeantHandle}>
        <View className="CreatePostForm">
        <FormWithFeedback onSubmit={handleCreatePostSubmit} message={message}>
            <Field id="title">Title</Field>
            <Field id="image">Image</Field>
            <Field id="description">Description</Field>

            <View direction='row'>
                <SubmitButton>Create</SubmitButton>
                <Button onClick={handleCancelCreatePostClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
    </div>
}

export default CreatePostForm