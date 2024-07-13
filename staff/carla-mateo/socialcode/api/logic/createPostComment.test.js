import 'dotenv/config'
import mongoose from 'mongoose'

import createPostComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPostComment('669157af8ed9f067959c8f35', '6691581b8ed9f067959c8f44', 'adios')
                .then(() => console.log('comment create'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))