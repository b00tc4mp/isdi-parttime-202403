import 'dotenv/config'
import mongoose from 'mongoose'

import getAllPosts from './getAllPosts.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllPosts('668c1d9df27ad1f0e5f0b86a')
                .then(posts => console.log('posts retrieved', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))