import 'dotenv/config'
import mongoose from 'mongoose'

import deleteProfile from './deleteProfile.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteProfile("66c2ddd186ca8793548cb67f")
                .then(() => console.log('profile deleted'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))