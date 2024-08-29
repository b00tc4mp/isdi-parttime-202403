const { Component } = React;

class Register extends Component {
	constructor() {
		super();

		this.state = {
			username: "",
			password: "",
			isSubmitted: false,
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
				this.clearForm();
			});
		} catch (error) {
			alert(error.message);
			return;
		}

		this.setState({ username: "", password: "" });
	};

	clearForm = () => {
		this.setState({ username: "", password: "", isSubmitted: true });

		setTimeout(() => {
			window.location.href = "../login/index.html";
		}, 1000);
	};

	render() {
		const { isSubmitted } = this.state;
		return (
			<div className='RegisterForm'>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='username'>Username:</label>
					<input
						id='username'
						type='text'
						placeholder='Username'
						onChange={this.handleChange}
					></input>

					<label htmlFor='password'>Password: </label>
					<input
						id='password'
						type='password'
						placeholder='Password'
						onChange={this.handleChange}
					></input>
					<button type='submit' className={isSubmitted ? "submitted" : ""}>
						Register
					</button>
				</form>
				<a href='../login/index.html'>Login</a>
			</div>
		);
	}
}
