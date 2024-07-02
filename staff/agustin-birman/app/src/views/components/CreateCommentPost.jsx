import { useState } from 'react'
import logic from '../../logic'
import FieldWithTextArea from '../../components/core/FieldWithTextArea'
import SubmitButton from '../../components/core/SubmitButton'
import Button from '../../components/core/Button'
import FormWithFeedback from '../../components/library/FormWithFeedback'

function CreateCommentPost({ onCancelCommentPost, onCommentPostSubmit, postID }) {
    const [message, setMessage] = useState('')

    const handleCancelCommentPost = () => onCancelCommentPost()

    const handleCommentPostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const textComment = form.textComment.value

        try {
            logic.createComment(textComment, postID, (error) => {
                if (error) {
                    console.error(error.message)

                    setMessage(error.message)

                    return
                }

                onCommentPostSubmit()
            })
        } catch (error) {
            console.error(error.message)

            setMessage(error.message)
        }
    }

    return (
        <>
            <FormWithFeedback className="CreateComment" onSubmit={handleCommentPostSubmit} message={message}>
                <FieldWithTextArea id='textComment' type='text' placeholder='Comment...'>Add comment</FieldWithTextArea>
                <SubmitButton>Add Comment</SubmitButton>
                <Button onClick={handleCancelCommentPost}>Cancel</Button>
            </FormWithFeedback>
        </>
    )
}

export default CreateCommentPost