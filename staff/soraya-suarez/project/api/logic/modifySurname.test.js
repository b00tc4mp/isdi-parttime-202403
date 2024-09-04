import 'dotenv/config'
import mongoose from 'mongoose'

import modifySurname from './modifySurname.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifySurname('66c1b645fe842c9b2769c0c8', 'SRZ')
                .then(() => console.log('updated surname of user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))