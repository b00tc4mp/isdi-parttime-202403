import View from "../library/View"
import Title from "../Title"
import Header from "./components/Header"
import Button from "../core/Button"

import logic from "../../logic"

import "./Home.css"

function Home({ onUserLoggedOut }) {
	const handleLogout = () => {
		logic.logoutUser()

		onUserLoggedOut()
	}
	return (
		<>
			<View className="View" tag="main">
				<Header>
					<Button onClick={handleLogout}>Logout</Button>
				</Header>

				<main>
					<Title>Home of Jack</Title>
				</main>

				<footer></footer>
			</View>
		</>
	)
}

export default Home
