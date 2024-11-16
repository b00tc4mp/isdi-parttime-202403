const { Component } = React;

class Login extends Component {
	constructor() {
		super();

		this.state = {
			username: "",
			password: "",
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const { username, password } = this.state;

		let usersJson = localStorage.getItem("users");
		let usersArray = JSON.parse(usersJson);

		if (!usersArray) {
			usersArray = "[]";
		}

		let userFound = usersArray.find((user) => user.username === username && user.password === password);

		if (userFound) {
			alert("Login correcto");
			location.href = "../index.html";
			this.setState({ password: "" });
			this.setState({ username: "" });
		} else {
			alert("Login incorrecto");
		}
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
					<button type='submit'>Login</button>
				</form>
			</div>
		);
	}
}
