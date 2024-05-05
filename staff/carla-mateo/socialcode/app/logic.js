const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/

const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{2,}$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat) => {
    if (!NAME_REGEX.test(name))
        throw new ContentError('❌ Name is not valid')

    if (!NAME_REGEX.test(surname))
        throw new ContentError('❌ Surname is not valid')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('❌ Email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('❌ Username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('❌ Password is not valid')

    if (!PASSWORD_REGEX.test(passwordRepeat))
        throw new ContentError('❌ Password repeat is not valid')

    if (password !== passwordRepeat)
        throw new MatchError('❌ Password don\'t match')


    let user = data.findUser((user) => user.email === email || user.username === username)

    if (user)
        throw new DuplicityError('❌ User already exist')

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
        throw new ContentError('❌ Username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('❌ Password is not valid')

    let user = data.findUser((user) => user.username === username)

    if (!user)
        throw new MatchError('❌ User not found')

    if (user.password !== password)
        throw new MatchError('❌ Wrong password')

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
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('❌ Title is not valid')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('❌ Image is not valid')
    if (typeof description !== 'string' || !description.length || description.length > 200) throw new ContentError('❌ Description is not valid')

    const newDate = new Date();
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDay()
    const hours = newDate.getHours()
    const minutes = newDate.getMinutes()


    const post = {
        author: sessionStorage.username,
        title,
        image,
        description,
        date: `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString()} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    data.insertPost(post)
}

logic.statusButton = () => {
    let statusButton = false

    addPostButton.onClick(event => {
        event.preventDefault()

        statusButton = !statusButton

        if (statusButton) {
            main.add(createPostForm)
            window.scrollTo(0, document.body.scrollHeight)

        } else if (!statusButton) {
            main.remove(createPostForm)
        }

    })
}

