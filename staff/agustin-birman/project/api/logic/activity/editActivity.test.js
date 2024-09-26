import 'dotenv/config'
import mongoose from 'mongoose'
import editActivity from './editActivity.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            editActivity('66a94dcb34505782bcd8cfd0', '66afc3b7f25abf38240bc9ac', 'helloo world', 'console.log')
                .then(() => console.log('actvity edited'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))