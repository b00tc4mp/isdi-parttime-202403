import 'dotenv/config'
import mongoose from 'mongoose'

import getTasksForDate from './getTasksForDate.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getTasksForDate('66c71ba3fff37f070d5cf0d3', new Date('2024-08-04'))
                .then((family) => {
                    console.log(family)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))