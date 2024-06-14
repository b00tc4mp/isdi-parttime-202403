import logic from "../../logic"

import View from "../library/View"
import Title from "../Title"
import FormWithFeedback from "../library/FormWithFeedback"
import Field from "../core/Field"
import CheckPasswordField from "../core/ShowPasswordField"
import Link from "../core/Link"
import SubmitButton from "../core/SubmitButton"

function Login({ onRegisterLinkClick, onUserLoggedIn }) {
	console.log("Login --> render")
	const handleLoginSubmit = (event) => {
		event.preventDefault()

		const target = event.target

		const username = target.username.value
		const password = target.password.value

		try {
			logic.loginUser(username, password, (error) => {
				if (error) {
					console.log(error)

					alert(error.message)
					return
				}

				onUserLoggedIn()
				console.log("user logged in")
			})
		} catch (error) {
			alert(error.message)
			console.error(error.message)
		}
	}

	const handleRegisterClick = (event) => {
		event.preventDefault()

		onRegisterLinkClick()
	}
	return (
		<>
			<View className="View LoginForm" tag="main">
				<Title>LOGIN</Title>
				<FormWithFeedback className="LoginForm" onSubmit={handleLoginSubmit}>
					<Field id="username" placeholder="Username">
						Username
					</Field>
					<CheckPasswordField id="password" placeholder="Password">
						Password
					</CheckPasswordField>
					<SubmitButton type="submit">Login</SubmitButton>
				</FormWithFeedback>
				<Link onClick={handleRegisterClick}> Don't have an account? Register </Link>
			</View>
		</>
	)
}

export default Login
