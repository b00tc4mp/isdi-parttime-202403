const { Component } = React

class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {
                name: '',
                surname: '',
                email: '',
                password: '',
                repeatPassword: '',
                successMessage: ''
            }
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
        const { name, surname, email, password, repeatPassword } = this.state;
        if (!name || !surname || !email || !password || password !== repeatPassword) {
            console.error('Please fill in all fields and make sure passwords match')
            return

        } else {
            console.log('Form Submitted: ', { name, surname, email, password, repeatPassword })
        }

        const data = {
            name,
            surname,
            email,
            password
        };

        localStorage.setItem('user', JSON.stringify(data));
        this.setState({
            successMessage: 'Registration succesful',
            name: '',
            surname: '',
            email: '',
            password: '',
            repeatPassword: ''

        });


        setTimeout(() => {
            window.location.href = '../LoginForm'
        }, 1000)

    }

    render() {
        const { name, surname, email, password, repeatPassword } = this.state

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' placeholder="Name" value={name} onChange={this.handleChange} required></input>
                </div>
                <div>
                    <label htmlFor='surname'>Surname</label>
                    <input type='text' id='surname' name='surname' placeholder="Surname" value={surname} onChange={this.handleChange} required></input>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder="Em@il" value={email} onChange={this.handleChange} required></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' placeholder="Password" value={password} onChange={this.handleChange} required></input>
                </div>
                <div>
                    <label htmlFor='repeatPassword'>Repeat Password</label>
                    <input type='password' id='repeatPassword' name='repeatPassword' placeholder="Confirm Password" value={repeatPassword} onChange={this.handleChange} required></input>
                </div>
                <button type='submit' onClick={this.handleSubmit}>Register</button>

            </form>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))

//const root = ReactDOM.createRoot(rootElement)







root.render([<RegisterForm />])

//root.render([nameField, nameLabel, surnameField, surnameLabel, emailField, emailLabel])