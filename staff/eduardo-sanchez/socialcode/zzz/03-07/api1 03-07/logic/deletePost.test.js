import 'dotenv/config'
import mongoose from 'mongoose'

import deletePost from './deletePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            deletePost('pepinillo', '668b0b723bf94eb0c659ea32', error => {
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
