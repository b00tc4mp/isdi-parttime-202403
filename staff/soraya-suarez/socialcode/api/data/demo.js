import mongoose from 'mongoose'
import { User, Post } from './index.js'


mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        Post.find({}).populate('author', 'username')
            .then(posts => console.log('retrieved', posts))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))