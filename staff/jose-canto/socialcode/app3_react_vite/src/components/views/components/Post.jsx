import { useState } from "react"

import Image from "../../core/Image"
import Heading from "../../core/Heading"
import Button from "../../core/Button"
import Text from "../../core//Text"
import Time from "../../views/components/Time"
import ConfirmDelete from "./ConfirmDelete"

import logic from "../../../logic"

function Post({ post, onPostDeleted }) {
	console.log("Post --> render")

	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

	const handleDeletePost = () => setShowConfirmDelete(true)

	const confirmDeletePost = () => {
		try {
			logic.deletePost(post.id, (error) => {
				if (error) {
					console.error(error)
					return
				}

				onPostDeleted()
				setShowConfirmDelete(false)
			})
		} catch (error) {
			console.error(error)
			alert(error.message)
		}
	}

	const cancelDeletePost = () => {
		setShowConfirmDelete(false)
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
					{showConfirmDelete && (
						<ConfirmDelete post={post} onConfirmDeletePost={confirmDeletePost} onCancelDeletePost={cancelDeletePost} />
					)}
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
