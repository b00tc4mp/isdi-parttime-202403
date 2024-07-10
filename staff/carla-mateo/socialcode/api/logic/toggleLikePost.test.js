import 'dotenv/config'
import mongoose from 'mongoose'

import toggleLikePost from './toggleLikePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost('668e306b09971635b862a3ef', '668e311f46d6341b3017f3ad')
                .then(() => console.log('user toggled like'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))