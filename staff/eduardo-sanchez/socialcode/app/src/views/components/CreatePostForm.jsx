import { useState } from 'react'

import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'

import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../useContext'


function CreatePostForm({ onCancelCreatePostClick, onPostCreated }) {
    console.log('CreatePostForm -> render')

    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const handleCancelCreatePostClick = () => onCancelCreatePostClick()

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const image = form.image.value
        const description = form.description.value

        try {
            logic.createPost(title, image, description)
                .then(() => onPostCreated())
                .catch(error => {
                    console.error(error)

                    if (error instanceof SystemError) {
                        alert(error.message)

                        return
                    }

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }

    return <View className="CreatePostForm">
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
}

export default CreatePostForm