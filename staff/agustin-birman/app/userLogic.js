const userLogic = {}

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/

userLogic.registerUser = (name, surname, email, username, password, passwordRepeat) => {
    if (!NAME_REGEX.test(name))
        throw new ContentError('Name is not valid')

    if (!NAME_REGEX.test(surname))
        throw new ContentError('Surname is not valid')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('Email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('Username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('Password is not valid')

    if (password !== passwordRepeat)
        throw new MatchError('Passwords don\'t match')

    let user = data.findUser(user => {
        return user.email === email || user.username === username
    })

    if (user)
        throw new DuplicityError('user already exists')

    user = {
        name,
        surname,
        email,
        username,
        password,
    }

    data.insertUser(user)
}

userLogic.loginUser = (username, password) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('Username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('Password is not valid')

    let user = data.findUser(user => {
        return user.username === username
    })

    if (!user)
        throw new MatchError('User not found')

    if (user.password !== password)
        throw new MatchError('Wrong password')

    sessionStorage.username = username
}

userLogic.isUserLoggedIn = () => { !!sessionStorage.username }

userLogic.logoutUser = () => { delete sessionStorage.username }

userLogic.getUserName = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    return user.name
}

userLogic.getLoggedInUsername = () => sessionStorage.username