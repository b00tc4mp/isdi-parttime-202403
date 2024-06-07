import { useState } from "react"

import logic from "./logic"

import Header from "./components/Title"
import Field from "./components/core/Field"
import CheckPasswordField from "./components/core/ShowPasswordField"
import Link from "./components/core/Link"
import SubmitButton from "./components/core/SubmitButton"
import FormWithFeedback from "./components/library/FormWithFeedback"

import "./index.css"
import "./components/LoginComponent.css"
import "./components/RegisterComponent.css"

function App() {
	const [view, setView] = useState("login")

	const handleRegisterSubmit = (event) => {
		event.preventDefault()

		const target = event.target

		const name = target.name.value
		const surname = target.surname.value
		const email = target.email.value
		const username = target.username.value
		const password = target.password.value
		const passwordRepeat = target.passwordRepeat.value

		try {
			logic.registerUser(name, surname, email, username, password, passwordRepeat, (error) => {
				if (error) {
					console.log(error)

					alert(error.message)
					return
				}
				setView("login")
				console.log("user registered")
			})
		} catch (error) {
			alert(error.message)
			console.error(error.message)
		}
	}

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
				setView("home")
				console.log("user logged in")
			})
		} catch (error) {
			alert(error.message)
			console.error(error.message)
		}
	}

	const handleRegisterClick = (event) => {
		event.preventDefault()

		setView("register")
	}
	const handleLoginClick = (event) => {
		event.preventDefault()

		setView("login")
	}

	return (
		<>
			{view === "register" && (
				<main className="View">
					<Header>REGISTER</Header>
					<FormWithFeedback className="RegisterForm" onSubmit={handleRegisterSubmit}>
						<Field id="name" placeholder="name">
							Name
						</Field>

						<Field id="surname" placeholder="surname">
							Surname
						</Field>

						<Field id="email" placeholder="email">
							Email
						</Field>

						<Field id="username" placeholder="username">
							Username
						</Field>

						<CheckPasswordField id="password" placeholder="Password">
							Password
						</CheckPasswordField>

						<CheckPasswordField id="passwordRepeat" placeholder="Password Repeat">
							Password Repeat
						</CheckPasswordField>

						<SubmitButton className="Button SubmitButton" type="submit">
							Register
						</SubmitButton>
					</FormWithFeedback>
					<Link onClick={handleLoginClick}>Have already an account? Login</Link>
				</main>
			)}

			{view === "login" && (
				<main className="View">
					<Header>LOGIN</Header>
					<FormWithFeedback className="LoginForm" onSubmit={handleLoginSubmit}>
						<Field id="username" placeholder="Username">
							Username
						</Field>
						<CheckPasswordField id="password" placeholder="Password">
							Password
						</CheckPasswordField>
						<SubmitButton className="Button SubmitButton" type="submit">
							Login
						</SubmitButton>
					</FormWithFeedback>
					<Link onClick={handleRegisterClick}> Don't have an account? Register </Link>
				</main>
			)}

			{view === "home" && (
				<main className="View">
					<h1>Home</h1>
				</main>
			)}
		</>
	)
}
export default App
