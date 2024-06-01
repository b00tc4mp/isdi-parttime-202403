import data from "../data/index.js" // importamos el objeto data
import { ContentError, DuplicityError, MatchError } from "../errors.js"
const logic = {}
//creamos un metodo para el objeto logic para almacenar los datos de los usuarios. Modelizar las reglas de negocio

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/

//añadimos el callback para poder trabajar en asincronia
logic.registerUser = (email, username, password, passwordRepeat, callback) => {

    if (!EMAIL_REGEX.test(email)) // .test funciona comprobamndo que el valor que lo pases contenga esos caracteres
        throw new ContentError("email is not valid")

    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")

    if (password !== passwordRepeat)
        throw new MatchError("passwords don't match")


    // let userRegistered = data.findUser(user => user.email === email || user.username === username) tenemos que hacerlo asyncro

    // find user tiene (condicion,callback) que a la vez callback tiene (error,user)
    // si no hay error del sistema devuelve (null y user)
    data.findUser(user => user.email === email || user.username === username, (error, user) => {
        if (error) { // este es el error del sistema de data (error de archivo)
            callback(error)

            return
        }
        // aqui lanzaria error si ya se encuentra usuario
        if (user) {
            callback(new DuplicityError("user already exists"))

            return
        }

        const newUser = {
            email: email,
            username: username,
            password: password
        }
        //insertUser recibe dos parametros (user,callback) que el callback es el error
        data.insertUser(newUser, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
        })
    })
}

// cambiamos el nombre de loginUser a authentication, ya que no cuardamos estado sesion, no guardamos datos, solo validamos. Las APIs son stateless
logic.authenticateUser = (username, password, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")
    // estamos buscando en la base de datos, que coincida el dato que le mandamos
    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }
        // los errores los mandamos al callback (no puede ser throw(syncro))
        if (!user) {
            callback(new MatchError("user not found"))

            return
        }

        if (user.password !== password) {
            callback(new MatchError("wrong password"))

            return
        }

        // si la autentificacion va bien mandamos error->null
        callback(null)
    })
}

// no manejamos la sessionstrage, ya que lo haremos desde el navegador
logic.getPosts = callback => {
    //convertimos la funcion findPost a asincro con el callback
    //al enviar true nos devuelve todos los posts, ahor le añadimos el callback que tenemos en la capa de datos (condition,callback)->(true,(callback))->(true,(error,posts))
    data.findPosts(() => true, (error, posts) => {
        if (error) {
            //como ya sabemos que data nos devuelve el error SystemError no envolvemos este error en system error como hacemos en data;
            //si nos conectaramos a otra base de datos (ej Mongo) si que necesitariamos especificarlo.
            callback(error)

            return
        }
        callback(null, posts.reverse())
    })
}

//enviamos el usuario que es lo que identifica de forma unica al usuario, luego usaremos id
//la api no sabe que usuario esta conectado (stateless), y para crear un post tiene que saber a que usuario hay que asociar el post
logic.createPost = (username, title, image, description, callback) => {

    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")
    if (typeof title !== "string" || !title.length || title.length > 50) throw new ContentError("title is not valid")
    if (typeof image !== "string" || !image.startsWith("http")) throw new ContentError("image is not valid")
    if (typeof description !== "string" || !description.length || description.length > 5000) throw new ContentError("description is not valid")

    //validamos si el usuario existe primero antes de insertar el post

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }
        // los errores los mandamos al callback (no puede ser throw(syncro))
        if (!user) {
            callback(new MatchError("user not found"))

            return
        }
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Agrega cero al mes si es de un solo dígito
        const dia = fechaActual.getDate().toString().padStart(2, '0'); // Agrega cero al día si es de un solo dígito
        const hora = fechaActual.getHours().toString().padStart(2, '0'); // Agrega cero a la hora si es de un solo dígito
        const minutos = fechaActual.getMinutes().toString().padStart(2, '0'); // Agrega cero a los minutos si es de un solo dígito

        const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}`;

        const post = {
            //id: Date.now(),-> ya lo maneja data 
            //author: sessionStorage.username,-> la logica tendra que recibir el username ya que no usamos sessionStorge aqui.
            author: username,
            title,
            image,
            description,
            date: fechaFormateada
        };

        data.insertPost(post, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
        })
    })
}

//logic.getLoggedInUsername = () => sessionStorage.username

//TODO
logic.deletePost = id => data.deletePost(post => post.id === id)

export default logic