import 'dotenv/config'
import mongoose from 'mongoose'

import toggleLikePost from './toggleLikePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost('6686d3ea95f11487d2369d21', '668beb7cd01e3759a0ed262f')
                .then(() => console.log('user toggled like'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))