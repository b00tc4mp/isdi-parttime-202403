import 'dotenv/config'
import mongoose from 'mongoose'

import createTask from './createTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createTask('66bc4460a9004b9a4c9a2ce5', 'CASA', 'hugo', 'hay que cambiar la fecha y la hora de X tarea')
                .then(() => console.log('task created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))