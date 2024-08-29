const { Component } = React

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false,


        }

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = this.state;
        console.log('Form Submitted: ', { email, password })
    }

    render() {
        const { email, password, } = this.state

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder="Em@il" value={email} onChange={this.handleChange} required></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' placeholder="Password" value={password} onChange={this.handleChange} required></input>
                </div>

                <button type='login' onClick={this.handleSubmit}>Login</button>

            </form>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))

//const root = ReactDOM.createRoot(rootElement)







root.render([<LoginForm />])

//root.render([nameField, nameLabel, surnameField, surnameLabel, emailField, emailLabel])