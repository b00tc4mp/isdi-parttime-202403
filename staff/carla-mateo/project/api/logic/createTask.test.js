import 'dotenv/config'
import mongoose from 'mongoose'

import createTask from './createTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createTask('66b9d14f63b2d4c0bba66349', '66b9d5092b89efb7b9b32afc', 'test task', 'hay que cambiar la fecha y la hora de X tarea')
                .then(() => console.log('task created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))