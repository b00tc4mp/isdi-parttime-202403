import 'dotenv/config'
import mongoose from 'mongoose'


import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
             registerUser('Pete', 'dan', 'Pete@dan.com','+00673542897', '1234', '1234')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))