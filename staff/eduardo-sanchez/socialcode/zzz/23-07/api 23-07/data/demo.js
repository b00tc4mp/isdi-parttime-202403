import mongoose from 'mongoose'
import { User, Post } from './index.js'


mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        // User.create({ name: 'Super', surname: 'Woman', email: 'super@woman.com', username: 'superwoman', password: '123123123' })
        //     .then(() => console.log('created'))
        //     .catch(error => console.error(error))

        // Post.create({ author: 'ramonin', title: 'console.log', image: 'https://whatever.com', description: '...' })
        //     .then(() => console.log('created'))
        //     .catch(error => console.error(error))

        // Post.find({})
        //     .then(posts => console.log('retrieved', posts))
        //     .catch(error => console.error(error))

        Post.find({}).populate('author', 'username')
            .then(posts => console.log('retrieved', posts))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))