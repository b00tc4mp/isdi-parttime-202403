// registro usuario
{
    // mandamos peticion a la api, llamamos al server con js (scraper)
    const xhr = new XMLHttpRequest
    //manejamos primero la respuesta antes de la peticion
    xhr.onload = () => {
        if (xhr.status === 201) {
            console.log("user registered")

            return
        }
        const { error, message } = JSON.parse(xhr.response)
        console.error(error, message)
    }
    // creamos conexion tipo post
    xhr.open("POST", "http://localhost:8080/users")

    //enviamos body tipo json

    const user = { username: "debigar", email: "deb@gmail.com", password: "1234", passwordRepeat: "1234" }
    const json = JSON.stringify(user)

    //cuando mandamos un json hay que especificar el content type

    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(json)

}

// autentificacion usuario
const xhr = new XMLHttpRequest
//manejamos primero la respuesta antes de la peticion
xhr.onload = () => {
    if (xhr.status === 200) {
        console.log("user authenticated")

        return
    }
    const { error, message } = JSON.parse(xhr.response)
    console.error(error, message)
}
// creamos conexion tipo post
xhr.open("POST", "http://localhost:8080/users/auth")

//enviamos body tipo json

const data = { username: "debigar", password: "1234" }
const json = JSON.stringify(data)

//cuando mandamos un json hay que especificar el content type

xhr.setRequestHeader("Content-type", "application/json")
xhr.send(json)
