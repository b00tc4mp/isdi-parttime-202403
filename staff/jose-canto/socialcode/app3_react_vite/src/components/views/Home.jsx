import { useState, useEffect } from "react"

import logic from "../../logic"

import View from "../library/View"
import Heading from "../core/Heading"
import Header from "./components/Header"
import Button from "../core/Button"
import PostList from "./components/PostList"
import Footer from "../core/Footer"
import CreatePostForm from "./components/CreatePostForm"

import "./Home.css"
import "../core/Input.css"
import "../core/CreatePostForm.css"
import "../core/Field.css"
import "../core/TextArea.css"

function Home({ onUserLoggedOut }) {
	console.log("Home --> render")

	const [name, setName] = useState("")
	const [view, setView] = useState("")
	const [postListRefresh, setPostListRefresh] = useState(0)

	const handleLogout = () => {
		logic.logoutUser()

		onUserLoggedOut()
	}

	useEffect(() => {
		console.log("Home --> UseEffect")
		try {
			logic.getUserName((error, name) => {
				if (error) {
					console.error(error.message)

					alert(error.message)
				}
				console.log("Home --> setName")

				setName(name)
			})
		} catch (error) {
			console.error(error.message)

			alert(error.message)
		}
	}, [])

	const handleCreatePostClick = () => setView("create-post")
	const handleCancelCreatePost = () => setView("")
	const handleCreatePost = () => {
		setPostListRefresh(Date.now())
		setView("")
	}

	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	return (
		<>
			<Header>
				<Heading level="3">{name}</Heading>
				<Button onClick={handleLogout}>Logout</Button>
			</Header>

			<View className="View" tag="view">
				<PostList refreshStamp={postListRefresh} />

				{view === "create-post" && (
					<CreatePostForm
						onCancelCreatedPostClick={handleCancelCreatePost}
						onPostCreated={handleCreatePost}
						onClickScrollTop={scrollTop}
					/>
				)}
			</View>

			<Footer onCreatePostClick={handleCreatePostClick} onClickScrollTop={scrollTop} />
		</>
	)
}

export default Home
