import { useState } from "react"
import logic from "../../../../logic"

import FormWithFeedback from "../../../library/FormWithFeedback"
import Field from "../../../core/Field"
import Button from "../../../core/Button"

import "./index.css"

function CreatePostForm({ onCancelCreatedPostClick, onPostCreated, onClickScrollTop }) {
  console.log("CreatePostForm --> render")

  const [message, setMessage] = useState("")

  const handleCancelCreatePostClick = () => onCancelCreatedPostClick()

  const handleCreatePostSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const title = form.title.value
    const image = form.image.value
    const description = form.description.value

    try {
      //prettier-ignore
      logic.createPost(title, image, description)
        .then(() => {
          onPostCreated()
          onClickScrollTop()
        })
        .catch((error) => {
          console.error(error.message)
          //alert(error.message)

          setMessage(error.message)
          setTimeout(() => setMessage(""), 2000)

          return
        })
    } catch (error) {
      console.error(error.message)
      //alert(error.message)

      setMessage(error.message)
      setTimeout(() => setMessage(""), 2000)
    }
  }

  return (
    <>
      <FormWithFeedback className="CreatePostForm" onSubmit={handleCreatePostSubmit} message={message}>
        <Field id="title" type="text" placeholder="Title">
          Title
        </Field>

        <Field id="image" type="text" placeholder="image">
          Image
        </Field>

        <label className="DescriptionForm">Description</label>
        <textarea className="TextArea" placeholder="description....." id="description"></textarea>
        <Button className="SubmitButton" type="submit">
          Create
        </Button>
        <i className="fa-regular fa-rectangle-xmark" onClick={handleCancelCreatePostClick}></i>
      </FormWithFeedback>
    </>
  )
}

export default CreatePostForm
