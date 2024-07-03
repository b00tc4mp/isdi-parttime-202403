const { Component } = React;

class Login extends Component {
	constructor() {
		super();

		this.state = {
			username: "",
			password: "",
		};
	}

	render() {
		return (
			<div className='LoginForm'>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='username'>Username:</label>
					<input id='username' type='text' onChange={this.handleChange}></input>

					<label>Password: </label>
					<input id='password' type='password' onChange={this.handleChange}></input>
					<button type='submit'>Login</button>
				</form>

				<a href='../register/index.html'>Register</a>
			</div>
		);
	}
}
