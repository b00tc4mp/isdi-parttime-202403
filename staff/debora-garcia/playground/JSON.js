const json = JSON.stringify({ hola: "mundo" }) //  convierte todo a string

localStorage.data = json // '{"hola":"mundo"}'

JSON.parse(localStorage.data) // {hola:"mundo"} convierte de nuevo a objeto



var users = []

var user = { username: "peter", pasword: "123" }

users.push(user)

var usersJson = JSON.stringify(users) // '[{"username":"peter","password":"123"}]

var users = JSON.parse(usersJson) // [{ username: "peter", pasword: "123" }]



try {
    throw new Error("hola error");
    console.log("codigo a ejecutar")

} catch (error) {
    console.error(error.message)// se recoje el error del mensaje "hola error"

}
console.log("continuacion del codigo")

var uno = 1;
var dos = 2;

try {
    if (uno === dos) {
        console.log("codigo a ejecutar");
    } else {
        throw new Error("hola error");
    }
} catch (error) {
    console.error(error.message); // Se recoje el error del mensaje "hola error"
}

console.log("continuacion del codigo");