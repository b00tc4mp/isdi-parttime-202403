// import mongodb from 'mongodb'

// const { MongoClient, ObjectId } = mongodb


import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        //console.log(connection)
        
        const db = connection.db('test')

        const users = db.collection('users')

        // users.insertOne({ name: 'Ramo', surname: 'Nin', email: 'ramo@nin.com', username: 'ramonin', password: '234234234' })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))
        
        // users.insertOne({ name: 'Perico', surname: 'Palotes', email: 'perico@palotes.com', username: 'pericopalotes', password: '111111111' })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        // users.deleteOne({ _id: new ObjectId('66829aeb1ac93618371fdd85') })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))
        
        users.find({}).toArray()
            .then(results => console.log(results))
            .catch(error => console.error(error))

        // users.updateOne({ _id: new ObjectId('66829b7e32276e1cad248eaf') }, { $set: { password: '555555555' } })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(result))

    })
    .catch(error => console.error(error))
