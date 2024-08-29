import 'dotenv/config'
import mongoose from 'mongoose'

import deleteTask from './deleteTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteTask('66c246b578074b1ea774369b', '66c251d90e5a7fcc5785bed4')
                .then(() => console.log('task deleted'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))