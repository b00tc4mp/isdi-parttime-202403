import { useState, useEffect } from "react"

import logic from "../../logic"

import View from "../library/View"
import Heading from "../core/Heading"
import Header from "./components/Header"
import Button from "../core/Button"
import PostList from "./components/PostList"
import Footer from "../core/Footer"

import "./Home.css"
import "../core/Input.css"
import "../core/CreatePostForm.css"
import "../core/Field.css"
import "../core/TextArea.css"

function Home({ onUserLoggedOut }) {
	console.log("Home --> render")

	const [name, setName] = useState("")
	const [view, setView] = useState("")

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
	const handelCancelCreatePost = () => setView("")

	return (
		<>
			<Header>
				<Heading level="3">{name}</Heading>
				<Button onClick={handleLogout}>Logout</Button>
			</Header>

			<View className="View" tag="view">
				<PostList />

				{view === "create-post" && (
					<form className="Form CreatePostForm">
						<div className="Field" bis_skin_checked="1">
							<label for="title">Title</label>
							<input className="Input" required="" id="title" type="text" placeholder="title" />
						</div>
						<div className="Field" bis_skin_checked="1">
							<label for="image">Image</label>
							<input className="Input" required="" id="image" type="text" placeholder="image" />
						</div>
						<label>Description</label>
						<textarea className="TextArea" placeholder="description....." id="TextArea"></textarea>
						<button className="Button SubmitButton" type="submit">
							Create
						</button>
						<i className="fa-regular fa-rectangle-xmark" onClick={handelCancelCreatePost}></i>
					</form>
				)}
			</View>

			<Footer onCreatePostClick={handleCreatePostClick} />
		</>
	)
}

export default Home
