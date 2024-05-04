const logic = {}

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat) => {
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
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)
}

logic.loginUser = (username, password) => {
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

logic.isUserLoggedIn = () => { !!sessionStorage.username }

logic.logoutUser = () => { delete sessionStorage.username }

logic.getUserName = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    return user.name
}

logic.getAllPosts = () => {
    const posts = data.findPosts(() => true)

    return posts.reverse()
}

logic.createPost = (title, image, description) => {
    if (typeof title !== 'string' || !title.length)
        throw new ContentError('Title is not valid')
    if (title.length > 50)
        throw new ContentError('Title is too long (It should be less than 50 characters)')

    if (typeof image !== 'string' || !image.startsWith('http'))
        throw new ContentError('Image is not valid')

    if (typeof description !== 'string' || description.length > 250)
        throw new ContentError('Description is not valid')

    const fullDate = new Date()
    const year = fullDate.getFullYear()
    let month = fullDate.getMonth() + 1
    let day = fullDate.getDay()
    let hour = fullDate.getHours()
    let minute = fullDate.getMinutes()

    if (month <= 9)
        month = '0' + month

    if (day <= 9)
        day = '0' + day

    if (hour <= 9)
        hour = '0' + hour

    if (minute <= 9)
        minute = '0' + minute

    const date = day + '/' + month + '/' + year + ' ' + hour + ':' + minute


    const post = {
        author: sessionStorage.username,
        title,
        image,
        description,
        date,
    }
    data.insterPost(post)
}