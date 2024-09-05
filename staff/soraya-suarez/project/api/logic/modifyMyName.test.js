import 'dotenv/config'
import mongoose from 'mongoose'

import modifyName from './modifyName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyName('66c1b645fe842c9b2769c0c8', 'Sorayaa')
                .then(() => console.log('updated name of user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))