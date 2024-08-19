import 'dotenv/config'
import mongoose from 'mongoose'

import editProfile from './editProfile.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            editProfile("66c2dc0386ca8793548cb65d", "huguito", "qFk5O@example.com", "avatars/anaranjado.png")
                .then(() => console.log('post edited'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))