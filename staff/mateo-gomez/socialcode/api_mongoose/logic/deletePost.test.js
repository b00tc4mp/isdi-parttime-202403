import 'dotenv/config'
import mongoose from 'mongoose'

import deletePost from './deletePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .catch(error => console.error(error))
    .then(() => {
        try {
            deletePost("668a739a50df84d483367be9", "668e9d867c0e4db95bcc6e01")
                .then(() => console.log('post deleted'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
