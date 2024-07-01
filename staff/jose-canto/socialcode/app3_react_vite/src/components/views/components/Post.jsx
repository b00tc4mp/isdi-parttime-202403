import { useEffect, useState } from "react"

import Image from "../../core/Image"
import Heading from "../../core/Heading"
import Text from "../../core//Text"
import Time from "../../views/components/Time"
import ConfirmDelete from "./ConfirmDelete"
import Navbar from "./Navbar"
import CreateComment from "./CreateComment"

import logic from "../../../logic"
import createComment from "../../../logic/createComment"

function Post({ post, onPostDeleted }) {
	console.log("Post --> render")

	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const [like, setLike] = useState(false)
	const [likeNum, setLikeNum] = useState(0)
	const [showAddComment, setShowAddComment] = useState(false)
	const [comments, setComments] = useState([])

	useEffect(() => {
		setLike(includeUserLike())
		setLikeNum(post.liked.length)
		setComments(post.comments || [])
	}, [])

	const includeUserLike = () => {
		const username = logic.getLoggedInUsername()
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

	const handleShowComment = () => {
		if (showAddComment) {
			setShowAddComment(false)
		} else {
			setShowAddComment(true)
		}
	}

	return (
		<>
			<article className="Article">
				<div className="Author_navbar">
					<Text className="AuthorTitle">{post.author}</Text>
					<Navbar post={post} handleDeletePost={handleDeletePost} />
				</div>

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
					<i className="fa-regular fa-comments" onClick={handleShowComment}></i>
				</div>

				{showAddComment && (
					<CreateComment
						onClickScrollTop={handleShowComment}
						onCommentCreated={setComments}
						onCancelCreatedCommentClick={handleShowComment}
					/>
				)}

				<div className="Comments">
					{comments.map((comment, index) => (
						<p key={index}>
							{comment.author}: {comment.text}
						</p>
					))}
				</div>
			</article>
		</>
	)
}

export default Post
