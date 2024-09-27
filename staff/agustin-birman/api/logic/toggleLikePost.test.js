import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost('6685c5e29e4dca5e7bbf9c49', '6685c5f49e4dca5e7bbf9c56')
                .then(() => console.log('post toggled like'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
