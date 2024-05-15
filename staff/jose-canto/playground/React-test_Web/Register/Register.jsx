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

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const { username, password, email } = this.state;

		const user = {
			username: username,
			password: password,
			email: email,
		};

		let users = localStorage.getItem("users");
		if (!users) {
			users = "[]";
		}

		users = JSON.parse(users);
		users.push(user);

		localStorage.setItem("users", JSON.stringify(users));

		// Reseteamos el estado
		this.setState({ password: "", username: "", email: "" });

		location.href = "../Login/index.html";
	};

	render() {
		return (
			<div className='ContainerForm'>
				<form className='Form' onSubmit={this.handleSubmit}>
					<label>
						Username:
						<input
							type='text'
							id='username'
							placeholder='Username'
							value={this.state.username}
							onChange={this.handleChange}
							required
						/>
					</label>
					<label>
						Password:
						<input
							type='password'
							id='password'
							placeholder='Password'
							value={this.state.password}
							onChange={this.handleChange}
							required
						/>
					</label>
					<label>
						Email:
						<input
							type='email'
							id='email'
							placeholder='Email'
							value={this.state.email}
							onChange={this.handleChange}
							required
						/>
					</label>
					<button type='submit'>Register</button>
				</form>
			</div>
		);
	}
}
