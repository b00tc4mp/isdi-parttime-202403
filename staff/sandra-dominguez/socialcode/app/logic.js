const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat) => {
    if (!NAME_REGEX.test(name))
        throw new ContentError('El nombre no es válido')

    if (!NAME_REGEX.test(surname))
        throw new ContentError('El apellido no es válido')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('El email no es válido')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('El nombre de usuario no es válido')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('La contraseña no es válida')

    if (password !== passwordRepeat)
        throw new MatchError('Las contraseñas no coinciden')

    let user = data.findUser(user => user.email === email || user.username === username)

    if (user)
        throw new DuplicityError('El usuario ya existe')

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
        throw new ContentError('El nombre no es válido')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('La contraseña no es válido')

    const user = data.findUser(user => user.username === username)

    if (!user)
        throw new MatchError('Usuario no encontrado')

    if (user.password !== password)
        throw new MatchError('Contraseña incorrecta')

    sessionStorage.username = username

}

logic.isUserLoggedIn = () => !!sessionStorage.username

logic.logoutUser = () => delete sessionStorage.username

logic.getUserName = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    return user.name
}

logic.getAllPosts = () => {
    const posts = data.findPosts(() => true)

    return posts.reverse()
}

logic.createPost = (title, image, description) => {
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('El titulo no es válido')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('La imagen no es válido')
    if (typeof description !== 'string' || !description.length || description.length > 400) throw new ContentError('La descripción no es válido')

    const post = {
        id: Date.now(),
        author: sessionStorage.username,
        title,
        image,
        description,
        date: new Date().toISOString()
    }

    data.insertPost(post)
}

logic.getLoggedInUsername = () => sessionStorage.username

logic.deletePost = id => data.deletePost(post => post.id === id)