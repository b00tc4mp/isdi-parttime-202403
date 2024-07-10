import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            authenticateUser('Cafeleche', '123123123')
                .then(userId => console.log('user authenticated', userId))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
