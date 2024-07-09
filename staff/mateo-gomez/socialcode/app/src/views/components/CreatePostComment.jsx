import { useState } from "react";
import logic from "../../logic"

import FormWithFeedback from '../../components/library/FormWithFeedBack'
import Button from "../../components/core/Button";

function CreatePostComment({ postId, onCancelCreatedCommentClick, onCommentPostSubmitted }) {
    console.log("CreatePostComment --> render")

    const [message, setMessage] = useState("")

    const handleCancelCommentClick = () => onCancelCreatedCommentClick()

    const handleCreatePostComment = (event) => {
        event.preventDefault()

        const form = event.target

        const textComment = form.textComment.value

        try {
            logic.createPostComment(postId, textComment, (error) => {
                if (error) {
                    console.error(error.message)

                    setMessage(error.message)

                    return
                }

                onCommentPostSubmitted()
            })
        } catch (error) {
            console.error(error.message)

            setMessage(error.message)
        }
    }

    return (
        <>
            <FormWithFeedback onSubmit={handleCreatePostComment} message={message}>
                <h1>TEST</h1>
            </FormWithFeedback>
        </>
    )
}

export default CreatePostComment
