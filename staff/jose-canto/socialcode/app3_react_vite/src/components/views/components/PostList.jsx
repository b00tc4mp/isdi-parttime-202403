import { useState, useEffect } from "react"
import "./Post.css"

import View from "../../library/View"
import Post from "./Post"

import logic from "../../../logic"

function PostList({ refreshStamp }) {
	console.log("Postlist --> render")

	const [posts, setPosts] = useState([])

	useEffect(() => {
		console.log("PostList --> useEffect")

		loadPosts()
	}, [refreshStamp])

	const loadPosts = () => {
		try {
			logic.getAllPosts((error, posts) => {
				if (error) {
					console.error(error)
					alert(error.message)
					return
				}
				setPosts(posts)
			})
		} catch (error) {
			console.error(error.message)

			alert(error.message)
		}
	}

	const handlePostDeleted = () => loadPosts()

	return (
		<>
			<View tag="section" className="Section">
				{posts.map((post) => (
					<Post post={post} key={post.id} onPostDeleted={handlePostDeleted}></Post>
				))}
			</View>
		</>
	)
}

export default PostList
