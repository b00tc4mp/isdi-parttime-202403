// Importamos el paquete mongodb y el constructor ObjectId y MongoClient
import { ObjectId, MongoClient } from "mongodb"

//const { MongoClient } = mongodb
//const { ObjectId } = mongodb

// Creamos una instancia de MongoClient con la URL de conexión a nuestro servidor MongoDB
const client = new MongoClient("mongodb://localhost:27017")

// Conectamos el cliente al servidor de MongoDB
client.connect()
  .then(connection => { // Una vez conectados, obtenemos la conexión en el parámetro 'connection'
    console.log(connection) // Imprimimos la conexión para verificar que se ha establecido correctamente

    // Seleccionamos la base de datos 'test' de la conexión
    const db = connection.db("test")

    // Seleccionamos la colección 'users' de la base de datos
    const users = db.collection("users")

    // Insertar un documento en la colección 'users'
    // users.insertOne({ name: "Jack", surname: "Sparrow", email: "jack@email.es", username: "Jack", password: "1234" })
    //   .then(result => console.log(result)) // Si la inserción es exitosa, se imprime el resultado
    //   .catch(error => console.error(error)) // Si hay un error, se imprime el error

    // Eliminar un documento de la colección 'users' por su _id
    //users.deleteOne({ _id: new ObjectId("667c5fba4ae9b20ca04f3d02") })
    //.then(result => console.log(result)) // Si la eliminación es exitosa, se imprime el resultado
    //.catch(error => console.error(error)) // Si hay un error, se imprime el error

    //Obtener todos los documentos de la colección 'users' y convertirlos a un array
    users.find({}).toArray()
      .then(users => console.log(users)) // Si la consulta es exitosa, se imprimen los documentos encontrados
      .catch(error => console.error(error)) // Si hay un error, se imprime el error

    // Actualizar un documento de la colección 'users' por su _id, cambiando el campo 'password'
    // users.updateOne({ _id: new ObjectId("667c5fba4ae9b20ca04f3d02") }, { $set: { password: "4321" } })
    // .then(result => console.log(result)) // Si la actualización es exitosa, se imprime el resultado
    //.catch(error => console.error(error)) // Si hay un error, se imprime el error
  })
  .catch(error => console.error(error)) // Si hay un error al conectar, se imprime el error
