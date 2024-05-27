import data from "./index.js"

/* data.findUser(user => user.username === "RotoJaz", (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
}) */

//insertUser no devuelve nada a no ser que haya un error, por eso solo recibe un solo parametro
data.insertUser({ username: "Koala", email: "koala@koala.com", "password": "1234" }, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log("user inserted")
})