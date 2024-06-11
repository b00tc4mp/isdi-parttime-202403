import { useState, useEffect } from "react"

import logic from "../../logic"

import View from "../library/View"
import Heading from "../core/Heading"
import Header from "./components/Header"
import Button from "../core/Button"
import PostList from "./components/PostList"

import "./Home.css"

function Home({ onUserLoggedOut }) {
	console.log("Home --> render")
	const [name, setName] = useState("")

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

	return (
		<>
			<Header>
				<Heading level="3">{name}</Heading>
				<Button onClick={handleLogout}>Logout</Button>
			</Header>

			<View className="View" tag="view">
				<PostList />
			</View>

			<footer></footer>
		</>
	)
}

export default Home
