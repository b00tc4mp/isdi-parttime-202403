import { useState, useEffect } from "react"
import "./Post.css"

import View from "../../library/View"
import Image from "../../core/Image"
import Heading from "../../core/Heading"
import Button from "../../core/Button"

import logic from "../../../logic"

function PostList() {
	console.log("Postlist --> render")

	const [posts, setPosts] = useState([])

	useEffect(() => {
		console.log("PostList --> useEffect")

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
	}, [])

	return (
		<>
			<View tag="section" className="Section">
				{posts.map((post) => (
					<article className="Article">
						<p className="AuthorTitle">{post.user}</p>

						<Heading level="2" className="PostTitle">
							{post.title}
						</Heading>

						<p className="PostText">{post.description}</p>

						<div className="DivImage">
							<Image className="Image" src={post.image}></Image>
						</div>

						<time>{post.date}</time>

						<Button className="DeleteButton">Delete</Button>
					</article>
				))}
			</View>
		</>
	)
}

export default PostList
