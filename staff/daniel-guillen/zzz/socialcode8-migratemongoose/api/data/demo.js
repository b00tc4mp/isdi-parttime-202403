import mongoose from 'mongoose'
import { User, Post } from './index.js'

const client = new MongoClient('mongodb://localhost:27017')

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        //  User.create({ name: 'Cat', surname: 'Woman', email: 'cat@woman.com', username: 'Catwoman', password: '123' })
        //      .then(() => console.log('created'))
        //      .catch(error => console.error(error))
             Post.create({ author: 'Catwoman', title: 'console.log', image: 'https://www.lacasadeel.net/wp-content/uploads/2022/11/batmancatwoman10-a-1068x539.jpg', description: '...' })
             .then(() => console.log('created'))
             .catch(error => console.error(error))
     })
     .catch(error => console.error(error))