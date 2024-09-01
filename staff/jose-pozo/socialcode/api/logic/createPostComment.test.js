import 'dotenv/config'
import mongoose from 'mongoose'

import createComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createComment('6695412b9e2f727d388fc681', '668c05aacd82c342f0d9040f', 'Light guide you too.')
                .then(() => console.log('comment created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))