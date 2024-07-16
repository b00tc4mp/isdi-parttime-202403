import { useState } from "react"

import logic from "../../../logic"
import FormWithFeedback from "../../library/FormWithFeedback"
import Field from "../../core/Field"
import Button from "../../core/Button"

function EditPostForm({ postId, onPostEdited, onCancelEditPost }) {
  const [message, setMessage] = useState("")

  const handleCancelEditPost = () => onCancelEditPost()

  const handleEditPostSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const title = form.title.value

    try {
      //prettier-ignore
      logic.editPostTitle(postId, title)
        .then(() => {
          onPostEdited()
        })
        .catch((error) => {
          console.error(error.message)

          setMessage(error.message)
          setTimeout(() => setMessage(""), 2000)
        })
    } catch (error) {
      console.error(error.message)

      setMessage(error.message)
      setTimeout(() => setMessage(""), 2000)
    }
  }

  return (
    <>
      <FormWithFeedback className="EditPostForm" onSubmit={handleEditPostSubmit}>
        <Field id="title" type="text" placeholder="New Title">
          Title
        </Field>
        <Button className="Button SubmitButton" type="submit">
          Edit Post
        </Button>
        <i className="fa-regular fa-rectangle-xmark" onClick={handleCancelEditPost}></i>
      </FormWithFeedback>
    </>
  )
}
export default EditPostForm
