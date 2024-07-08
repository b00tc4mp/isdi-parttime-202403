import 'dotenv/config'
import mongoose from 'mongoose'

import deletePost from './deletePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(connection => {
        try {
            deletePost("668af4c0d0a759a2295dfbfc", "668b0e21f438ad1eaf7d91a8",
                error => {
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






