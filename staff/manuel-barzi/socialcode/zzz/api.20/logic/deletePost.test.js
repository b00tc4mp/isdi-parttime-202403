import 'dotenv/config'
import mongoose from 'mongoose'

import deletePost from './deletePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deletePost('wendydarling', '66844f262095abc229e74cdd', error => {
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