import 'dotenv/config'
import mongoose from 'mongoose'

import addTask from './addTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            addTask('66c1b645fe842c9b2769c0c8', '66c1b645fe842c9b2769c0c8', 'Otra', ':)', 'toDo', 'medium', true,  error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('task added')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))