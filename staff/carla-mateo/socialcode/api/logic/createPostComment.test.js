import 'dotenv/config'
import mongoose from 'mongoose'

import createPostComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPostComment('6691574c8ed9f067959c8f21', '6696331a7fa4ac5f0af3c4cd', 'prueba')
                .then(() => console.log('comment create'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))