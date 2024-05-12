/* Este fragmento de código define una class llamada "RegisterForm" que extiende "FormWithFeedback". Adentro
el constructor de `RegisterForm`, inicializa varios campos del formulario como nombre, apellido, correo electrónico,
nombre de usuario, contraseña y repetir contraseña utilizando la class `Field`. A cada Field se le asigna un tipo,
etiqueta y valor de marcador de posición. Además, se crea un botón de envío utilizando `SubmitButton`. */
class RegisterForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('RegisterForm')

        const nameField = new Field('name', 'text', 'Name')
        nameField.setPlaceholder('name')

        const surnameField = new Field('surname', 'text', 'Surname')
        surnameField.setPlaceholder('surname')

        const emailField = new Field('email', 'email', 'E-mail')
        emailField.setPlaceholder('name@example.com')

        const usernameField = new Field('username', 'text', 'Username')
        usernameField.setPlaceholder('username')

        const passwordField = new Field('password', 'password', 'Password')
        passwordField.setPlaceholder('password')

        const passwordRepeatField = new Field('repassword', 'password', 'Password repeat')
        passwordRepeatField.setPlaceholder('repeat password')

        const submitButton = new SubmitButton('Register')

        this.add(nameField)
        this.add(surnameField)
        this.add(emailField)
        this.add(usernameField)
        this.add(passwordField)
        this.add(passwordRepeatField)
        this.add(submitButton)

        this.onSubmit(event => {
            event.preventDefault()

            const name = this.getName()
            const surname = this.getSurname()
            const email = this.getEmail()
            const username = this.getUsername()
            const password = this.getPassword()
            const passwordRepeat = this.getPasswordRepeat()


            try {
                logic.registerUser(name, surname, email, username, password, passwordRepeat)

                this.clear()

                this.setFeedback('🎉User registered🎉', 'success')

                this.onRegisteredListener()
            } catch (error) {
                if (error instanceof ContentError)
                    this.setFeedback(error.message + ', please, correct it')
                else if (error instanceof MatchError)
                    this.setFeedback(error.message + ', please, retype them')
                else if (error instanceof DuplicityError)
                    this.setFeedback(error.message + ', please, enter new one')
                else
                    this.setFeedback('😵 Sorry, please try again later')
            }
        })
    }

    getName() {
        const nameField = this.children[0]

        return nameField.getValue()
    }

    getSurname() {
        const surnameField = this.children[1]

        return surnameField.getValue()
    }

    getEmail() {
        const emailField = this.children[2]

        return emailField.getValue()
    }

    getUsername() {
        const usernameField = this.children[3]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[4]

        return passwordField.getValue()
    }

    getPasswordRepeat() {
        const passwordFieldRepeat = this.children[5]

        return passwordFieldRepeat.getValue()
    }

    onRegistered(listener) {
        this.onRegisteredListener = listener
    }
}