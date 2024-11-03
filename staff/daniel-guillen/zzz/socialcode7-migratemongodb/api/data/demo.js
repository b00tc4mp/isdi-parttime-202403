import mongodb from 'mongodb'
//import { MongoClient, ObjectId } from 'mongodb'

const { MongoClient } =mongodb

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
        .then(connection => {
            const db = connection.db('test')
    
            const users = db.collection('users')
        
        //    users.insertOne({ name: 'pedro', surname: 'mapache', email: 'pedro@mapache.com', username: 'elmapache', password: '123123' })
        //    .then(result => console.log(result))
        //    .catch(error => console.error(error))

         users.deleteOne({ _id: new ObjectId('66818d075e170f3bddc96241') })
           .then(result => console.log(result))
           .catch(error => console.error(error))

        //    users.find({}).toArray()
        //   .then(results => console.log(results))
        //   .catch(error => console.error(error))

        // users.updateOne({ _id: new ObjectId('668136b5bc68b2f277cc8988') }, { $set: { password: '123' } })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(result))
    })
    .catch(error => console.error(error))
