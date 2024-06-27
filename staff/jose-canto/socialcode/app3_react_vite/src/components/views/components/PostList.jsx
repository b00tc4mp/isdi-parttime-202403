import { useState, useEffect } from "react"
import "./Post.css"

import View from "../../library/View"
import Post from "./Post"

import logic from "../../../logic"
import useInfiniteScroll from "../../../utils/useInfiniteScroll"

function PostList({ refreshStamp }) {
	console.log("Postlist --> render")

	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [limit] = useState(2)

	useEffect(() => {
		console.log("PostList --> useEffect")
		setPosts([])
		setPage(1)
		loadPosts(1, limit)
	}, [refreshStamp])

	const loadPosts = (page, limit) => {
		try {
			logic.getAllPosts(page, limit, (error, newPosts) => {
				if (error) {
					console.error(error)
					alert(error.message)
					return
				}
				console.log("cargando posts...")
				console.log(newPosts)
				setTimeout(() => {
					setPosts((prevPosts) => [...prevPosts, ...newPosts])
				}, 500)
			})
		} catch (error) {
			console.error(error.message)

			alert(error.message)
		}
	}

	const handlePostDeleted = () => {
		setPage(1)
		setPosts([])
		loadPosts(1, limit)
	}

	useInfiniteScroll(() => {
		const nextPage = page + 1
		setPage(nextPage)
		loadPosts(nextPage, limit)
	})

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
