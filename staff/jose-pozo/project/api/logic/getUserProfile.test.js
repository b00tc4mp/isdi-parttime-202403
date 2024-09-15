import 'dotenv/config'
import mongoose from 'mongoose'

import getUserProfile from './getUserProfile.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserProfile('66b3a6d7478462d12028066f', '66b47cfe68d6d076394ca4cb')
                .then(targetUser => console.log('targetUser retrieved', targetUser))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))