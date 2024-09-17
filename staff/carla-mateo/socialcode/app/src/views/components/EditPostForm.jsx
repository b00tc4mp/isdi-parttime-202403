import { useState } from "react"
import FormWithFeedback from '../../components/library/FormWithFeedback'
import Button from "../../components/core/Button"
import SubmitButton from "../../components/core/SubmitButton"
import View from "../../components/library/View"

import logic from "../../logic"
import Field from "../../components/core/Field"

function EditPostForm({ postId, onPostEditted, onCancelEditPostClick }) {
    console.log("Edit title --> render")

    const [message, setMessage] = useState("")

    const handleCancelEditPostClick = () => onCancelEditPostClick()

    const handleEditePostTitle = (event) => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value

        try {
            logic.editPostTitle(postId, title)
                .then(() => onPostEditted())
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
            <FormWithFeedback className="EditPostTitle" onSubmit={handleEditePostTitle} message={message}>
                <Field id="title" type="text" placeholder="New title">
                    Title
                </Field>

                <View direction="row">
                    <SubmitButton>Edit Post</SubmitButton>

                    <Button onClick={handleCancelEditPostClick}>Cancel</Button>

                </View>

            </FormWithFeedback >
        </>
    )
}

export default EditPostForm