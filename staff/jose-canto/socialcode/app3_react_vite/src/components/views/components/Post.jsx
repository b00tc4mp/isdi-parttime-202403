import Image from "../../core/Image"
import Heading from "../../core/Heading"
import Button from "../../core/Button"

import logic from "../../../logic"

function Post({ post, onPostDeleted }) {
	console.log("Post --> render")
	const handleDeletePost = (postId) => {
		try {
			logic.deletePost(postId, (error) => {
				if (error) {
					console.error(error)
					return
				}

				onPostDeleted()
			})
		} catch (error) {
			console.error(error)
			alert(error.message)
		}
	}

	return (
		<>
			<article className="Article">
				<p className="AuthorTitle">{post.author}</p>

				<Heading level="2" className="PostTitle">
					{post.title}
				</Heading>

				<p className="PostText">{post.description}</p>

				<div className="DivImage">
					<Image className="Image" src={post.image}></Image>
				</div>

				<time>{post.date}</time>

				{post.author === logic.getLoggedInUsername() && (
					<Button className="DeleteButton" onClick={() => handleDeletePost(post.id)}>
						Delete
					</Button>
				)}
			</article>
		</>
	)
}

export default Post
