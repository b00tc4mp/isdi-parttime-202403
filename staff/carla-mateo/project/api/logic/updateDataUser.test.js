import 'dotenv/config'
import mongoose from 'mongoose'

import updateDataUser from './updateDataUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateDataUser('66c30e9f9f5859571897dfdb', 'huguito', 'qFk5O@example.com', 'avatars/anaranjado.png')
                .then(() => console.log('profile edited'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))