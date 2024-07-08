import 'dotenv/config'
import mongoose from 'mongoose'

import createPostComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPostComment('668a892327b39d7b19b4e254', '668ab54f27b39d7b19b4e259', 'hola k tal?', (error) => {

                if (error) {
                    console.error(error)

                    return
                }

                console.log('comment created')
            })
        } catch (error) {
            console.error(error)

        }
    })
    .catch(error => console.error(error))