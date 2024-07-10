import 'dotenv/config'
import mongoose from 'mongoose'

import createPostComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPostComment('668e306b09971635b862a3ef', '668e311f46d6341b3017f3ad', 'hola')
                .then(() => console.log('comment create'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))