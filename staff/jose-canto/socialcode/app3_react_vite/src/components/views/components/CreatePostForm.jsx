import logic from "../../../logic"

function CreatePostForm({ onCancelCreatedPostClick, onPostCreated, onClickScrollTop }) {
	console.log("CreatePostForm --> render")
	const handleCancelCreatePostClick = () => onCancelCreatedPostClick()

	const handleCreatePostSubmit = (event) => {
		event.preventDefault()

		const form = event.target

		const title = form.title.value
		const image = form.image.value
		const description = form.description.value

		try {
			logic.createPost(title, image, description, (error) => {
				if (error) {
					console.error(error.message)
					alert(error.message)
					return
				}

				onPostCreated()
				onClickScrollTop()
			})
		} catch (error) {
			console.error(error.message)
			alert(error.message)
		}
	}

	return (
		<>
			<form className="Form CreatePostForm" onSubmit={handleCreatePostSubmit}>
				<div className="Field">
					<label htmlFor="title">Title</label>
					<input className="Input" required="" id="title" type="text" placeholder="title" />
				</div>
				<div className="Field">
					<label htmlFor="image">Image</label>
					<input className="Input" required="" id="image" type="text" placeholder="image" />
				</div>
				<label>Description</label>
				<textarea className="TextArea" placeholder="description....." id="description"></textarea>
				<button className="Button SubmitButton" type="submit">
					Create
				</button>
				<i className="fa-regular fa-rectangle-xmark" onClick={handleCancelCreatePostClick}></i>
			</form>
		</>
	)
}

export default CreatePostForm
