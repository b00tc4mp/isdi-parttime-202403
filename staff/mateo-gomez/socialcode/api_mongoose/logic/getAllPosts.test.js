import 'dotenv/config'
import mongoose from 'mongoose'

import getAllPosts from './getAllPosts.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllPosts('668a892327b39d7b19b4e254')
                .then(posts => console.log('posts retrieved', posts))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
