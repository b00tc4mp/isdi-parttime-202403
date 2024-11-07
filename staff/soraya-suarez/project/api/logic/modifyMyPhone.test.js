import 'dotenv/config'
import mongoose from 'mongoose'

import modifyMyPhone from './modifyMyPhone.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyMyPhone('66c1b645fe842c9b2769c0c8', '656748932')
                .then(() => console.log('updated phone of user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))