import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'

const { MONGODB_URL_TEST } = process.env

mongoose.connect(MONGODB_URL_TEST)
    .then(() => {
        try {
            authenticateUser('AdrianGon', '123123')
                .then(userId => console.log('user authenticated', userId))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })