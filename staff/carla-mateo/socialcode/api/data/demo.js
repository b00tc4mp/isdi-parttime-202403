import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        const db = connection.db('test')

        const users = db.collection('users')

        // users.insertOne({ name: 'eve', surname: 'lyn', email: 'eve@lyn.com', username: 'evelyn', password: '1234' })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        // users.deleteOne({ _id: new ObjectId('667d10bd046330cc60cc898c') })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        users.find({}).toArray()
            .then(results => console.log(results))
            .catch(error => console.error(error))

        // users.updateOne({ _id: new ObjectId('667d1a885dfbc6dd5b6aa12f') }, { $set: { password: '3456' } })
        //     .then(results => console.log(results))
        //     .catch(error => console.error(error))
    })

    .catch(error => console.error(error))