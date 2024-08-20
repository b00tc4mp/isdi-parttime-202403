import 'dotenv/config'
import mongoose from 'mongoose'

import createTask from './createTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createTask('66c4df3199236f7f76612cb0', null, 'title', 'hay que cambiar la fecha y la hora de X tarea', new Date)
                .then(() => console.log('task created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))