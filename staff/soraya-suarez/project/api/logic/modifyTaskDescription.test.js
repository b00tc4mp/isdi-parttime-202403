import 'dotenv/config'
import mongoose from 'mongoose'

import modifyTaskDescription from './modifyTaskDescription.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyTaskDescription('66c1b645fe842c9b2769c0c8', '66d5e76db232864866cf3bb1', 'Describiendoooo')
                .then(() => console.log('updated task description'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))