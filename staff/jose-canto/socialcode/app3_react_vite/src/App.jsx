import "./App.css";
import { Component } from "react";
import logic from "./logic";

import "./components/LoginComponent.css";
import "./components/core/Field.css";
import "./components/core/Form.css";
import "./components/library/FormWithFeedback.css";
import "./components/core/Input.css";
import "./components/core/Button.css";
import "./components/core/SubmitButton.css";

class App extends Component {
	constructor() {
		super();
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const target = event.target;

		const username = target.username.value;
		const password = target.password.value;

		try {
			logic.loginUser(username, password, (error) => {
				if (error) {
					console.error(error.message + ", please, correct it ❌");
					return;
				}

				console.log("user logged in");
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	render() {
		return (
			<main>
				<form className='Form LoginForm' onSubmit={this.handleSubmit}>
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
			</main>
		);
	}
}
export default App;
