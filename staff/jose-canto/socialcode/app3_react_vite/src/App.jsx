import { useState } from "react";

import logic from "./logic";

import "./index.css";

import "./components/LoginComponent.css";
import "./components/RegisterComponent.css";
import "./components/core/Field.css";
import "./components/core/Form.css";
import "./components/library/FormWithFeedback.css";
import "./components/core/Input.css";
import "./components/core/Link.css";
import "./components/core/Button.css";
import "./components/core/SubmitButton.css";
import "./components/core/CheckPasswordField.css";
import "./components/core/TextArea.css";

function App() {
	const [view, setView] = useState("login");

	const handleRegisterSubmit = (event) => {
		event.preventDefault();

		const target = event.target;

		const name = target.name.value;
		const surname = target.surname.value;
		const email = target.email.value;
		const username = target.username.value;
		const password = target.password.value;
		const passwordRepeat = target.passwordRepeat.value;

		try {
			logic.registerUser(name, surname, email, username, password, passwordRepeat, (error) => {
				if (error) {
					console.log(error);

					alert(error.message);
					return;
				}
				setView("login");
				console.log("user registered");
			});
		} catch (error) {
			alert(error.message);
			console.error(error.message);
		}
	};

	const handleLoginSubmit = (event) => {
		event.preventDefault();

		const target = event.target;

		const username = target.username.value;
		const password = target.password.value;

		try {
			logic.loginUser(username, password, (error) => {
				if (error) {
					console.log(error);

					alert(error.message);
					return;
				}
				setView("home");
				console.log("user logged in");
			});
		} catch (error) {
			alert(error.message);
			console.error(error.message);
		}
	};

	const handleLoginClick = (event) => {
		event.preventDefault();

		setView("login");
	};

	const handleRegisterClick = (event) => {
		event.preventDefault();

		setView("register");
	};

	return (
		<>
			{view === "register" && (
				<main className='View'>
					<h1 className='HeaderLoginRegister'>REGISTER</h1>
					<form className='Form RegisterForm' onSubmit={handleRegisterSubmit}>
						<div className='Field'>
							<label htmlFor='name'>Name</label>
							<input required='' id='name' type='text' placeholder='name' />
						</div>
						<div className='Field'>
							<label htmlFor='surname'>Surname</label>
							<input required='' id='surname' type='text' placeholder='surname' />
						</div>
						<div className='Field'>
							<label htmlFor='email'>E-mail</label>
							<input required='' id='email' type='email' placeholder='name@example.com' />
						</div>
						<div className='Field'>
							<label htmlFor='user'>Username</label>
							<input required='' id='username' type='text' placeholder='Username' />
						</div>
						<div className='Field'>
							<label htmlFor='password'>Password</label>
							<input required='' id='password' type='password' placeholder='Password' />
							<i className='fa-regular fa-eye' aria-hidden='true'></i>
						</div>
						<div className='Field passwordRepeat'>
							<label htmlFor='passwordRepeat'>Password Repeat</label>
							<input
								required=''
								id='passwordRepeat'
								type='password'
								placeholder='Repeat Password'
							/>
						</div>
						<button className='Button SubmitButton' type='submit'>
							Register
						</button>
					</form>
					<a className='Link' onClick={handleLoginClick}>
						Login
					</a>
				</main>
			)}

			{view === "login" && (
				<main className='View'>
					<h1 className='HeaderLoginRegister'>LOGIN</h1>
					<form className='Form LoginForm' onSubmit={handleLoginSubmit}>
						<div className='Field'>
							<label htmlFor='username'>Username</label>
							<input required='' id='username' type='text' placeholder='Username' />
						</div>
						<div className='Field'>
							<label htmlFor='password'>Password</label>
							<input required='' id='password' type='password' placeholder='Password' />
							<i className='fa-regular fa-eye' aria-hidden='true'></i>
						</div>
						<button className='Button SubmitButton' type='submit'>
							Login
						</button>
					</form>
					<a className='Link' onClick={handleRegisterClick}>
						Register
					</a>
				</main>
			)}

			{view === "home" && (
				<main className='View'>
					<h1>Home</h1>
				</main>
			)}
		</>
	);
}
export default App;
