const { Component } = React;

class Register extends Component {
	constructor() {
		super();

		this.state = {
			username: "",
			password: "",
		};
	}

	handleChange = (event) => {
		const id = event.target.id;
		const value = event.target.value;

		this.setState({ [id]: value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const { username, password } = this.state;

		try {
			logic.registerUser(username, password, (error) => {
				if (error) {
					alert(error.message);

					return;
				}

				console.log("User created");
			});
		} catch (error) {
			alert(error.message);
			return;
		}
	};

	render() {
		return (
			<div className='RegisterForm'>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='username'>Username:</label>
					<input id='username' type='text' onChange={this.handleChange}></input>

					<label htmlFor='password'>Password: </label>
					<input id='password' type='password' onChange={this.handleChange}></input>
					<button type='submit'>Register</button>
				</form>
				<a href='../login/index.html'>Login</a>
			</div>
		);
	}
}
