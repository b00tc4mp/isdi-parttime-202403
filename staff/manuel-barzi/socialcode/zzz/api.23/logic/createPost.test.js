import 'dotenv/config'
import mongoose from 'mongoose'

import createPost from './createPost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPost('66859a59d54c3bf8f5e205da', 'hello world', 'https://miro.medium.com/v2/resize:fit:1024/1*OohqW5DGh9CQS4hLY5FXzA.png', 'console.log("hello world")')
                .then(() => console.log('post created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))