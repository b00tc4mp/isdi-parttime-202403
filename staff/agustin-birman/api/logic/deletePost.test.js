import deletePost from './deletePost.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env


mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deletePost('6685c5e29e4dca5e7bbf9c49', '6685c8d50548602f95343a11')
                .then(() => console.log('post deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))


