const logic = {}
//creamos un metodo para el objeto logic para almacenar los datos de los usuarios. Modelizar las reglas de negocio

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/

logic.registerUser = (email, username, password, passwordRepeat) => {

    if (!EMAIL_REGEX.test(email)) // .test funciona comprobamndo que el valor que lo pases contenga esos caracteres
        throw new ContentError("email is not valid")

    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")

    if (password !== passwordRepeat)
        throw new MatchError("passwords don't match")


    let userRegistered = data.findUser(user => { return user.email === email || user.username === username })

    if (userRegistered)
        throw new DuplicityError("user already exists")


    const user = {
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)

}


logic.loginUser = (username, password) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")

    let user = data.findUser(user => user.username === username)

    if (!user)
        throw new MatchError("user not fount")

    if (user.password !== password)
        throw new MatchError("wrong password")

    sessionStorage.username = username
    // sessionStorage almacena datos mientras la ventana esté abierta
    // de esta manera conectas al usuario a la session
}

logic.isUserLoggedIn = () => !!sessionStorage.username

logic.logoutUser = () => delete sessionStorage.username

logic.getUserName = () => {
    const user = data.findUser(user => {
        return user.username === sessionStorage.username
    })
    return user.username
}

logic.getPosts = () => {
    const posts = data.findPosts(() => true)

    return posts.reverse()
}

logic.createPost = (title, image, description) => {
    if (typeof title !== "string" || !title.length || title.length > 50) throw new ContentError("title is not valid")
    if (typeof image !== "string" || !image.startsWith("http")) throw new ContentError("image is not valid")
    if (typeof description !== "string" || !description.length || description.length > 5000) throw new ContentError("description is not valid")


    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Agrega cero al mes si es de un solo dígito
    const dia = fechaActual.getDate().toString().padStart(2, '0'); // Agrega cero al día si es de un solo dígito
    const hora = fechaActual.getHours().toString().padStart(2, '0'); // Agrega cero a la hora si es de un solo dígito
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0'); // Agrega cero a los minutos si es de un solo dígito

    const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}`;

    const post = {
        id: Date.now(),// identificador de hora y milisegundos
        author: sessionStorage.username,
        title,
        image,
        description,
        date: fechaFormateada
    };

    data.insertPost(post)

}

logic.getLoggedInUsername = () => sessionStorage.username

logic.deletePost = id => data.deletePost(post => post.id === id)