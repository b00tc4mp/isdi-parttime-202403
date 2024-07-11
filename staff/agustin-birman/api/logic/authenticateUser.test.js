import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            authenticateUser('pepitogrillo', '123123123')
                .then(userId => console.log('user authenticated', userId))
                .catch(error => console.error(error))
        } catch (error) {

        }
    })
    .catch(error => console.error(error))


