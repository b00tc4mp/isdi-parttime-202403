import 'dotenv/config'
import mongoose from 'mongoose'

import updateDataUser from './updateDataUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateDataUser('66cad199b405991bce930c88', {
                username: 'huguito',
                email: 'qFk5O@example.com',
                avatar: 'avatars/anaranjado.png'
            })
                .then(() => console.log('profile edited'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))