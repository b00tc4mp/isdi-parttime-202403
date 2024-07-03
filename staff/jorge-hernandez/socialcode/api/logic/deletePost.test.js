import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(connection => {
        try {
            deletePost('Jorge', '6684ede2d9d6bb8d50f8bebb', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post deleted')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))