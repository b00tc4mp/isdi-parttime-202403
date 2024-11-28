import 'dotenv/config'
import mongoose from 'mongoose'

import createPost from './createPost.js'

const { MONGODB_URL } = process.env


mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            createPost('6686d49d2d61da561b4e209f', 'Guasa!', 'https://miro.medium.com/v2/resize:fit:1024/1*OohqW5DGh9CQS4hLY5FXzA.png', 'console.log("hello world")', error => {
                if (error) {
                    console.error(error)

                    return
                }
                console.log('post created')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))