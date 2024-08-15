import 'dotenv/config'
import mongoose from 'mongoose'

import getMyFinishedTasks from './getMyFinishedTasks.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getMyFinishedTasks('66b4c032d54497eae7195f22', (error, tasks) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('tasks retrieved', tasks)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))