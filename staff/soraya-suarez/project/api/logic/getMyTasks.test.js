import 'dotenv/config'
import mongoose from 'mongoose'

import getMyTasks from './getMyTasks.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getMyTasks('66afc674cc8e7c4304f65b8d', (error, tasks) => {
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