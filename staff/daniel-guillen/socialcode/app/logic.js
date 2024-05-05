const logic = {}

/* Estas expresiones regulares se utilizan para la validación en el proceso de
registro de usuario en el formulario proporcionado. */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

/* La función `logic.registerUser` es responsable de registrar un nuevo usuario en el sistema.
Se necesita completar correctamente campos como `nombre`, `apellido`, `correo electrónico`,
`nombre de usuario`, `contraseña` y `repetir contraseña`.
De lo contrario mandara un aviso o error mediante un Feedback dentro del Form */
logic.registerUser = (name, surname, email, username, password, passwordRepeat) => {
    if (!NAME_REGEX.test(name))
        throw new ContentError('Name is not valid  ⛔')

    if (!NAME_REGEX.test(surname))
        throw new ContentError('Surname is not valid  ⛔')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('Email is not valid  ⛔')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('Username is not valid  ⛔')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('Password is not valid  ⛔')

    if (password !== passwordRepeat)
        throw new MatchError('Passwords don\'t match 😵')

    const user = data.findUser(user => user.email === email || user.username === username)

    if (user)
        throw new DuplicityError('User already exists ⛔')

    user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)
}

/* La función `logic.loginUser` es responsable de manejar el proceso de inicio de sesión de un usuario.
Se necesita completar correctamente dos campos, "nombre de usuario" y "contraseña". Aquí hay un desglose de lo que hace: */
logic.loginUser = (username, password) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid ⛔')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid ⛔')

    const user = data.findUser(user => user.username === username)

    if (!user)
        throw new MatchError('user not found 🔎')

    if (user.password !== password)
        throw new MatchError('wrong password 😵')

    sessionStorage.username = username
}

/* `logic.isUserLoggedIn = () => !!sessionStorage.username` es una función que verifica si un usuario está
actualmente conectado. Devuelve "verdadero" si hay un valor almacenado en "sessionStorage.username",
indicando que un usuario ha iniciado sesión.
Los dobles signos de exclamación `!!` se utilizan para convertir el valor
a un booleano, asegurando que la función devuelva "verdadero" si el usuario ha iniciado sesión o "falso"
si el usuario no ha iniciado sesión. */
logic.isUserLoggedIn = () => !!sessionStorage.username

/* esta función es responsable de cerrar la sesión de un usuario. Cuando se llama a esta función, se elimina
la clave `username` del objeto `sessionStorage`, desconectando al usuario eliminando su información de sesión almacenada.
Esta acción borra los datos de la sesión del usuario, indicando que ya no están conectados. */
logic.logoutUser = () => delete sessionStorage.username

/* La función `logic.getUserName` recupera el nombre del usuario actualmente conectado. 1º encuentra el objeto de usuario
en el almacenamiento de datos cuyo nombre de usuario coincide con el nombre de usuario almacenado en el `sessionStorage`.
Luego, devuelve el nombre de ese usuario. Esta función es útil para mostrar el nombre del usuario que inició sesión
en la interfaz de usuario o en un lugar determinado de app. */
logic.getUserName = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    return user.name
}

/* La función `logic.getAllPosts` recupera todas las publicaciones del almacenamiento de datos.
Llama a la función `data.findPosts` con una función de devolución de llamada que siempre devuelve verdadero, recupera 
todos los mensajes. Luego, invierte el orden de las publicaciones usando el método "inverso" antes de regresar a ellos.
Esto garantiza que las publicaciones se muestren en orden cronológico inverso, más recientes primero. */
logic.getAllPosts = () => {
    const posts = data.findPosts(() => true)

    return posts.reverse()
}

/* La función `logic.createPost` es responsable de crear una nueva publicación en el sistema, es necesario tres
parámetros: `título`, `imagen` y `descripción`. */

logic.createPost = (title, image, description) => {
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('title is not valid ⛔')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('image is not valid ⛔')
    if (typeof description !== 'string' || !description.length || description.length > 200) throw new ContentError('description is not valid ⛔')

    const post = {
        author: sessionStorage.username,
        title,
        image,
        description,
        date: new Date().toISOString()
    }

    data.insertPost(post)
}