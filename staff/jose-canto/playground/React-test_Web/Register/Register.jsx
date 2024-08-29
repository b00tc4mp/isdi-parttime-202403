const { Component } = React;

class Register extends Component {
	constructor() {
		super();

		this.state = {
			username: "",
			password: "",
			email: "",
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const form = event.target;
		const username = form.username.value;
		const password = form.password.value;
		const email = form.email.value;

		const user = {
			username: username,
			password: password,
			email: email,
		};

		this.setState({ user });

		let users = localStorage.getItem("users");
		if (!users) {
			users = "[]";
		}

		users = JSON.parse(users);
		users.push(user);

		localStorage.setItem("users", JSON.stringify(users));

		location.href = "../Login/index.html";
	};

	render() {
		return (
			<div className='ContainerForm'>
				<form className='Form' onSubmit={this.handleSubmit}>
					<label>
						Username:
						<input type='text' id='username' placeholder='Username' required />
					</label>
					<label>
						Password:
						<input type='password' id='password' placeholder='Password' required />
					</label>
					<label>
						Email:
						<input type='email' id='email' placeholder='Email' required />
					</label>
					<button type='submit'>Register</button>
				</form>
			</div>
		);
	}
}
