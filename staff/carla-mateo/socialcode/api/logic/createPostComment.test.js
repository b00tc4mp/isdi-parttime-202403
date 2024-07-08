import 'dotenv/config'
import mongoose from 'mongoose'

import createPostComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPostComment('6686c3e1dd24eb84190d4818', '668bbfc53f6db233673de004', 'hola', (error) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('comment create')
            })

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))