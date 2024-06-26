import logic from "../../logic"

function CreatePostForm({ onCancelCreatePostClick, onPostCreated }) {
  const handleCreatePostClick = () => onCancelCreatePostClick()

  const handleCreatePostSubmit = (event) => {
    event.preventDefault()

    const form = event.form

    const title = form.title.value
    const image = form.image.value
    const description = form.description.value

    try {
      logic.createPost(title, image, description, (error) => {
        if (error) {
          console.error(erorr)
          alert(error.message)

          return
        }

        setPostListRefreshStamp(Date.now)
        setView("")
      })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <form
      class="Form FormWithFeedback CreatePostForm"
      onSubmit={handleCreatePostSubmit}
    >
      <div class="Field">
        <label for="title">Title</label>
        <input class="Input" id="title" type="text" placeholder="title" />
      </div>
      <div class="Field">
        <label for="image">Image</label>
        <input class="Input" id="image" type="text" placeholder="image" />
      </div>
      <div class="Field">
        <label for="description">Description</label>
        <input
          class="Input"
          id="description"
          type="text"
          placeholder="description"
        />
      </div>
      <button
        class="Button"
        type="button"
        onClick={handleCancelCreatePostClick}
      >
        Cancel
      </button>
      <button class="Button SubmitButton" type="submit">
        Create
      </button>
      <p class="Feedback">image is not valid, please, correct it</p>
    </form>
  )
}

export default CreatePostForm
