import mongodb, { ObjectId } from 'mongodb'

const { MongoClient } = mongodb

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        const db = connection.db('test')

        const users = db.collection('users')

        // users.insertOne({ name:'Adrian', surname:'Gon', email:'Adrian@gon.com', username: 'AdrianGon',password: '123456789' })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        // users.deleteOne({ _id: new ObjectId('667d3a8fea21f86e28cc8988') })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        users.find({}).toArray()
            .then(result => console.log(result))
            .catch(error => console.error(error))

    })
    .catch(error => console.error(error))