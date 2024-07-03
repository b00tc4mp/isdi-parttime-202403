import getAllPosts from './getAllPosts.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllPosts('6685c5e29e4dca5e7bbf9c49', (error, posts) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('posts retrieved', posts)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

