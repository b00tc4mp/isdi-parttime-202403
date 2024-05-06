
const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const USERNAME_REGEX = /^[\w-]+$/

const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/


logic.registerUser = (name, surname, email, username, password, passwordRepeat) => {
    //Input validation
    if (!NAME_REGEX.test(name))
        throw new ContentError('name is not valid')

    if (!NAME_REGEX.test(surname))
        throw new ContentError('surname is not valid')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('usename is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')

    if (password !== passwordRepeat) {
        throw new MatchError('password don\'t match')
    }

    let userRegistered = data.findUser((user) => {
        return user.email === email || user.userame === username
    })



    if (userRegistered)
        throw new DuplicityError('username already exists')






    const user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password,
    }

    data.insertUser(user)

}

logic.loginUser = (username, password) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')

    let userFound = data.findUser((user) => user.username === username)

    if (!userFound)
        throw new MatchError('User not found')

    if (userFound.password !== password)
        throw new MatchError('wrong password')

    sessionStorage.username = username

    //TODO abything else?
}

logic.isUserLoggedIn = () => {
    return !!sessionStorage.username
}

logic.logoutUser = () => {
    delete sessionStorage.username
}

logic.getUserName = () => {
    const user = data.findUser((user) => {
        return user.username === sessionStorage.username
    })
}

logic.getAllPosts = () => {
    const posts = data.findPosts(() => true)


    return posts.reverse()
}

logic.createPost = (title, image, description) => {
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('title is not valid')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('image is not valid')
    if (typeof description !== 'string' || !description.length || description.length > 200) throw new ContentError('description is not valid')

    const post = {
        author: sessionStorage.username,
        title,
        image,
        description,
        date: new Date().toISOString()
    }

    data.insertPost(post)
}