import 'dotenv/config'
import mongoose from 'mongoose'

import modifyTaskAsOwner from './modifyTaskAsOwner.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyTaskAsOwner('66b4bdcc64ab6e0c4cc166ce', '66bbc258186bac28f093a600', 'inProgress', 'He empezado la tarea')
                .then(() => console.log('updated task as owner'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))