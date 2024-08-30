import mongoose from 'mongoose'
import { User, Post } from './index.js'


mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        User.create({ name: 'Ensa', surname: 'Ladilla', email: 'ensa@ladilla.com', username: 'Ensaladilla', password: '123' })
            .then(() => console.log('created'))
            .catch(error => console.error(error))

        // Post.create({ author: 'X', title: 'X', image: 'x', description: 'x' })
        //     .then(() => console.log('created'))
        //     .catch(error => console.error(error))
    })
    .catch(error => console.error(error))