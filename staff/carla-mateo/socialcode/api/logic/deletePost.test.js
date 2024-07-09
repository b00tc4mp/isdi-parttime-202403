import 'dotenv/config'
import mongoose from 'mongoose'

import deletePost from './deletePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deletePost("6686c3e1dd24eb84190d4818", "668d5abbdd8e530167594543")
                .then(() => console.log('post deleted'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

