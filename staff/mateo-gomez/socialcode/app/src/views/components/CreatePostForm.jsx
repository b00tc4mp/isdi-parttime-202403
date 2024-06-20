import { useState } from 'react'

import logic from '../../logic'
import './CreatePostForm.css'

import Field from '../../components/core/Field'

import FormWithFeedback from '../../components/library/FormWithFeedBack'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import View from '../../components/library/View'

function CreatePostForm({ onCancelCreatePostClick, onPostCreated }) {
    console.log('CreatePostForm -> render')

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

                    //alert(error.message)
                    setMessage(error.message)

                    return
                }

                onPostCreated()

            })

        } catch (error) {
            console.error(error)

            // alert(error.message)
            setMessage(error.message)
        }

    }

    return <View className='CreatePostForm'>
        <FormWithFeedback onSubmit={handleCreatePostSubmit} message={message}>

            <Field id='title'>Title</Field>
            <Field id='image'>Image</Field>
            <Field id='description'>Description</Field>

            <View direction='row'>
                <Button className="Button CancelButton" type="button" onClick={handleCancelCreatePostClick}>Cancel</Button>
                <SubmitButton className="SubmitButton CreateButton" >Create</SubmitButton>
            </View>

        </FormWithFeedback >
    </View>
}


export default CreatePostForm