import Image from "../../core/Image"
import Heading from "../../core/Heading"
import Button from "../../core/Button"
import Text from "../../core//Text"
import Time from "../../views/components/Time"

import logic from "../../../logic"

function Post({ post, onPostDeleted }) {
	console.log("Post --> render")
	const handleDeletePost = () => {
		if (confirm("Delete this post?")) {
			try {
				logic.deletePost(post.id, (error) => {
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
	}

	return (
		<>
			<article className="Article">
				<Text className="AuthorTitle">{post.author}</Text>

				<Heading level="2" className="PostTitle">
					{post.title}
				</Heading>

				<Text className="PostText">{post.description}</Text>

				<div className="DivImage">
					<Image className="Image" src={post.image}></Image>
				</div>

				<Time>{post.date}</Time>

				{post.author === logic.getLoggedInUsername() && (
					<Button className="DeleteButton" onClick={handleDeletePost}>
						Delete
					</Button>
				)}
			</article>
		</>
	)
}

export default Post
