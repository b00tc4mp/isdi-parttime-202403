import 'dotenv/config'
import mongoose from 'mongoose'

import getTasksForDate from './getTasksForDate.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getTasksForDate('66cac4ee4a7629597f88bb2b', new Date('2024-08-31'))
                .then((family) => {
                    console.log(family)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))