import 'dotenv/config'
import mongoose from 'mongoose'

import modifyMyPassword from './modifyMyPassword.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyMyPassword('66c1b645fe842c9b2769c0c8', '123123123', '321321321', '321321321')
                .then(() => console.log('updated password of user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))