import mongodb from 'mongodb'

const { MongoClient } = mongodb

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        console.log(connection)

        const db = connection.db('test')

        const users = db.collection('users')

        /*users.insertOne({
            name: "Jason",
            surname: "Tatum",
            email: "tatum@celtics.com",
            username: "jasontatum",
            password: "123123123"
        })
            .then(result => console.log(result))
            .catch(error => console.error(error))*/

        users.find({}).toArray()
            .then(results => console.log(results))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))