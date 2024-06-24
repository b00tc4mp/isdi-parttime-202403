import { useEffect, useState } from "react"

import Image from "../../core/Image"
import Heading from "../../core/Heading"
import Button from "../../core/Button"
import Text from "../../core//Text"
import Time from "../../views/components/Time"
import ConfirmDelete from "./ConfirmDelete"

import logic from "../../../logic"
import getLoggedInUsername from "../../../logic/getLoggedInUsername"

function Post({ post, onPostDeleted }) {
	console.log("Post --> render")

	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const [like, setLike] = useState(false)
	const [likeNum, setLikeNum] = useState(0)

	useEffect(() => {
		setLike(includeUserLike())
		setLikeNum(post.liked.length)
	}, [])

	const includeUserLike = () => {
		const username = getLoggedInUsername()
		return post.liked.includes(username)
	}

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

	const handleLike = () => {
		logic.toggleLike(post.id, (error) => {
			if (error) {
				console.error(error)
				return
			}

			if (like) {
				setLike(false)
				setLikeNum(likeNum - 1)
			} else {
				setLike(true)
				setLikeNum(likeNum + 1)
			}
		})
	}

	return (
		<>
			<article className="Article">
				<Text className="AuthorTitle">{post.author}</Text>

				<Heading level="2" className="PostTitle">
					{post.title}
				</Heading>
				<div className="TextContainer">
					<Text className="PostText">{post.description}</Text>
				</div>

				<div className="DivImage">
					<Image className="Image" src={post.image}></Image>
					{showConfirmDelete && (
						<ConfirmDelete post={post} onConfirmDeletePost={confirmDeletePost} onCancelDeletePost={cancelDeletePost} />
					)}
				</div>

				<div className="TimeLike">
					<Time>{post.date}</Time>
					<i className={`Likes ${like ? "fa-solid fa-heart" : "fa-regular fa-heart"}`} onClick={handleLike}>
						<sub>{likeNum}</sub>
					</i>
				</div>

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
