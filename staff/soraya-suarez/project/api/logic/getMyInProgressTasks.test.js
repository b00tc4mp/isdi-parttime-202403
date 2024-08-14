import 'dotenv/config'
import mongoose from 'mongoose'

import getMyInProgressTasks from './getMyInProgressTasks.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getMyInProgressTasks('66b4c032d54497eae7195f22', (error, posts) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('tasks retrieved', posts)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))