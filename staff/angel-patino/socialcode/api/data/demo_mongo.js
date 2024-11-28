import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        const db = connection.db('test')

        const users = db.collection('users')

        users.insertOne({ name: 'Bat', surname: 'Man', email: 'bat@man.com', username: 'BatMan', password: '123123123' })
            .then(result => console.log(result))
            .catch(error => console.error(error))

        // users.deleteOne({ _id: new ObjectId('667c5c1d8e6ac610bb9f7f6a') })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        //users.find({}).toArray()
        //  .then(results => console.log(results))
        //.catch(error => console.error(error))

        // users.updateOne({ _id: new ObjectId('667c60becdc4257cb3416eca') }, { $set: { password: '234234234' } })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(result))
    })
    .catch(error => console.error(error))