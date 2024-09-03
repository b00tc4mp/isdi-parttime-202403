import 'dotenv/config'
import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

const { MONGODB_URL } = process.env


mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            authenticateUser('peterpan', '123123123', (error, userId) => {
                if (error) {
                    console.error(error)

                    return
                }
                console.log('user authenticated', userId)
            })
        } catch (error) {
            console.errror(error)
        }
    })
    .catch(error => console.error(error))