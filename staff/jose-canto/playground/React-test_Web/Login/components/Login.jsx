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
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const { username, password } = this.state;

		const user = {
			username: username,
			password: password,
		};

		localStorage.user = JSON.stringify(user);

		this.setState({ password: "" });
		this.setState({ username: "" });
	};

	render() {
		return (
			<div className='ContainerForm'>
				<form className='Form' onSubmit={this.handleSubmit}>
					<label>
						Username:
						<input
							type='text'
							name='username'
							id='username'
							placeholder='Username'
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Password:
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Password'
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</label>
					<button type='submit'>Login</button>
				</form>
			</div>
		);
	}
}
