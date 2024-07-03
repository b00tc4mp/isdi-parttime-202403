import mongoose from 'mongoose'
import { User, Post } from './index.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        // User.create({ name: 'Super', surname: 'Woman', email: 'super@woman.com', username: 'superwoman', password: '123123123'})
        //     .then(() => console.log('created'))
        //     .catch(error => console.error(error))


        Post.create({ author: 'AdrianGon', title: 'comments', image:'https://whatever.com', description: 'blah blah blah'})
            .then(() => console.log('created'))
            .catch(error => console.error(error))

    })
    .catch(error => console.error(error))



// import { mongodb,  ObjectId } from 'mongodb'

// const { MongoClient } = mongodb

// const client = new MongoClient('mongodb://localhost:27017')

// client.connect()
//     .then(connection => {
//         const db = connection.db('test')

//         const users = db.collection('users')

//         // users.insertOne({ name:'Adrian', surname:'Gon', email:'Adrian@gon.com', username: 'AdrianGon',password: '123456789' })
//         //     .then(result => console.log(result))
//         //     .catch(error => console.error(error))

//         // users.deleteOne({ _id: new ObjectId('667d3a8fea21f86e28cc8988') })
//         //     .then(result => console.log(result))
//         //     .catch(error => console.error(error))

//         users.find({}).toArray()
//             .then(result => console.log(result))
//             .catch(error => console.error(error))

//     })
    .catch(error => console.error(error))