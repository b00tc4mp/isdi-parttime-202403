import mongodb from 'mongodb'

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        console.log(connection)

        const db = connection.db('test')

        const users = db.collection('users')

        users.insertOne({
            name: 'Pepito',
            surname: 'Grillo',
            email: 'pepito@grillo.com',
            username: 'pepitogrillo',
            password: '123123123',
            passwordRepeat: '123123123'
        })
            .then(result => console.log(result))
            .catch(error => console.log(error))

        // users.deleteOne({ _id: '667c389b3d8271120ecc8988' })

        // users.updateOne({ _id: '1234567890' }, { $set: { name: 'Pepito' } })


    })
    .catch(error => console.log(error))