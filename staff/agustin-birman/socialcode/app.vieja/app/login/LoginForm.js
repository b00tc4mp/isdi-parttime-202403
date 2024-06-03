class LoginForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('LoginForm')

        const usernameField = new Field('username', 'text', 'Username')

        const passwordField = new Field('password', 'password', 'Password')

        const imageField = new Image
        imageField.setUrl('https://site-assets.fontawesome.com/releases/v6.5.2/svgs/regular/lock.svg')
        imageField.addClass('Lock')
        imageField.onClick(() => {

            let passwordButton = document.getElementById('password')

            if (passwordButton.type === 'password') {
                passwordButton.type = 'text'
                imageField.setUrl('https://site-assets.fontawesome.com/releases/v6.5.2/svgs/regular/lock-open.svg')
            } else {
                passwordButton.type = 'password'
                imageField.setUrl('https://site-assets.fontawesome.com/releases/v6.5.2/svgs/regular/lock.svg')
            }

        })

        this.onSubmit(event => {
            event.preventDefault()

            const username = this.getUsername()
            const password = this.getPassword()

            try {
                userLogic.loginUser(username, password, error => {
                    if (error) {
                        this.setFeedback(error.message + ', please, correct it')

                        return
                    }

                    this.clear()

                    this.setFeedback('user successfully logged in', 'success')

                    this.onLoggedInListener()

                    setTimeout(() => location.href = '../home', 1000)
                })
            } catch (error) {
                if (error instanceof ContentError)
                    this.setFeedback(error.message + ', please, correct it')
                else if (error instanceof MatchError)
                    this.setFeedback('wrong credentials')
                else
                    this.setFeedback('sorry, there was an error, please try again later')
            }
        }
        )

        const submitButton = new SubmitButton('Login')

        this.add(usernameField)
        this.add(passwordField)
        this.add(imageField)
        this.add(submitButton)
    }

    getUsername() {
        const usernameField = this.children[0]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[1]

        return passwordField.getValue()
    }

    onLoggedIn(listener) {
        this.onLoggedInListener = listener
    }
}