import logic from '../../logic'

function CreatePostForm({ onCancelCreatePostClick, onPostCreated }) {
    console.log('CreatePostForm -> render')

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

                    alert(error.message)

                    return
                }

                onPostCreated()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <form className="Form FormWithFeedback CreatePostForm" onSubmit={handleCreatePostSubmit}>
        <div className="Field">
            <label htmlFor="title">Title</label>
            <input className="Input" id="title" type="text" placeholder="title" />
        </div>
        <div className="Field">
            <label htmlFor="image">Image</label>
            <input className="Input" id="image" type="text" placeholder="image" />
        </div>
        <div className="Field">
            <label htmlFor="description">Description</label>
            <input className="Input" id="description" type="text" placeholder="description" />
        </div>
        <button className="Button" type="button" onClick={handleCancelCreatePostClick}>Cancel</button>
        <button className="Button SubmitButton" type="submit">Create</button>
        <p className="Feedback">image is not valid, please, correct it</p>
    </form>
}

export default CreatePostForm
