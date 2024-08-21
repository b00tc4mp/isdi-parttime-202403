import 'dotenv/config'
import mongoose from 'mongoose'

import getTargetProfile from './getTargetProfile.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getTargetProfile('66c4cf978c769799b033ac61', '66c4d34a8c769799b033ac9a')
                .then(targetProfile => console.log('Target profile retrieved', targetProfile))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))