import 'dotenv/config'
import mongoose from 'mongoose'

import updateTaskDescription from './updateTaskDescription.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateTaskDescription("66cac4ee4a7629597f88bb2b", "66cd7968029a763fdef8c815", "nueva descripcion")
                .then(() => console.log('task description edited'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))