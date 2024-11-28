import 'dotenv/config'
import mongoose from 'mongoose'

import createPostComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .catch(error => console.error(error))
    .then(() => {
        try {
            createPostComment('668a739a50df84d483367be9', '668f9e232be9a16b2dfaf979', 'hola k tal?')
                .then(() => console.log('comment created'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)

        }
    })
