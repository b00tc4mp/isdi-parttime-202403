import { MongoClient, ObjectId } from "mongodb"
//object Id es una cosntructora que esta dentro del paquete mongo  

// construimos un cliente que nos permita conectar a mongo

//este es el puerto que se conecta por defecto el servidor
const client = new MongoClient("mongodb://localhost:27017")

//es como un try catch asincrono con promesas
client.connect()
    .then(connection => {
        //console.log(connection)
        // conectarme dentro de la base de datos test y devuelve el manejador de la base de datos 
        const db = connection.db("test")
        // y dento d la base de datos, conectarse a la coleccion de usuarios
        const users = db.collection("users")
        //es un proceso asincrono que funciona con promesas
        users.insertOne({ email: "lionleo@gmail.com", username: "LionLeo", password: "1234" })
            .then(result => console.log(result))
            .catch(error => console.error(error))

        // users.deleteOne({ _id: new ObjectId("6682d19fb2b1e028a3f77ee7") })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        // users.find({}).toArray() // devuelve todos los usuarios
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        // users.updateOne({ _id: new ObjectId("ID") }, { $set: { password: "otropassword" } })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

    })
    .catch(error => console.error(error))
