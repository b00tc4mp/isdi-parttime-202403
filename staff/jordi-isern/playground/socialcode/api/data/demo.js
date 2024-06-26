import mongodb  from 'mongodb'

const {MongoClient, ObjectId} = mongodb

const client = new MongoClient('mongodb://localhost:27017')

client.connect ()
    .then(connection => {

        const db= connection.db('test')

        const users = db.collection('users')

        // users.insertOne({ name: 'Capitan', surname: 'Garfio', email: 'Capitan@garfio.com', username: 'CapitanGarfio', password: '123123123' })
        // .then(result => console.log(result))
        // .cath(error => console.error(error))

        users.deleteOne({ _id: new ObjectId('667c5c1d8c6a219cd869c0cb')})
            .then(result => console.log(result))
            .cath(error => console.error(error))

        // users.find({}).toArray()
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))
    })
    .catch(error => console.error(error))