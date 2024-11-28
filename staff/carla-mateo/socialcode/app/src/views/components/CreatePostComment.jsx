import { useState } from "react"
import FormWithFeedback from '../../components/library/FormWithFeedback'
import Button from "../../components/core/Button"
import Label from "../../components/core/Label"
import View from "../../components/library/View"

import "./CreatePostForm.css"

import logic from "../../logic"

function CreatePostComment({ postId, onCommentPostSubmitted, onCancelCreateCommentClick }) {
    console.log("CreateComment --> render")

    const [message, setMessage] = useState("")

    const handleCancelCreateCommentClick = () => onCancelCreateCommentClick()

    const handleCreateCommentSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const comment = form.comment.value

        try {
            logic.createPostComment(postId, comment)
                .then((newComment) => onCommentPostSubmitted(newComment))
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
                <textarea className="Text" placeholder="bla... bla..." id="comment"></textarea>

                <View direction='row'>

                    <Button className="Button SubmitButton" type="submit">
                        Add Comment
                    </Button>

                    <Button onClick={handleCancelCreateCommentClick}>Cancel</Button>

                </View>



            </FormWithFeedback>
        </>
    )
}

export default CreatePostComment