import createActivity from './createActivity.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createActivity('66abce851a0dc4acbe205e41', 'hello world', 'console.log')
                .then(() => console.log('actvity created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))