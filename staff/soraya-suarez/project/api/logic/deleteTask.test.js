import 'dotenv/config'
import mongoose from 'mongoose'

import deleteTask from './deleteTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteTask('66afc69ecc8e7c4304f65b90', '66b286dc44e4f54a644eff92', '66afc69ecc8e7c4304f65b90', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('task deleted')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))