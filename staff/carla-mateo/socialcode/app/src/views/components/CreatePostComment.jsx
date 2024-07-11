import { useState } from "react"
import FormWithFeedback from '../../components/library/FormWithFeedback'
import Button from "../../components/core/Button"
import Label from "../../components/core/Label"
import Text from "../../components/core/Text"

import logic from "../../logic"

function CreatePostComment({ postId, onCommentPostSubmitted }) {
    console.log("CreateComment --> render")

    const [message, setMessage] = useState("")

    const handleCreateCommentSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const comment = form.comment.value

        try {
            logic.createPostComment(postId, comment)
                .then(() => onCommentPostSubmitted())
                .catch(error => {
                    console.error(error.message)

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error.message)

            setMessage(error.message)
        }
    }
    return (
        <>
            <FormWithFeedback className="CreatePostComment" onSubmit={handleCreateCommentSubmit} message={message}>
                <Label>Write a comment</Label>
                <Text className="Text" placeholder="bla... bla..." id="comment"></Text>
                <Button className="Button SubmitButton" type="submit">
                    Add Comment
                </Button>

            </FormWithFeedback>
        </>
    )
}

export default CreatePostComment