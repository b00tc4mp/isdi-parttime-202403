import 'dotenv/config'
import mongoose from 'mongoose'

import taskDay from './taskDay.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            taskDay('66c4e1645977091ceb8b584d')
                .then((family) => {
                    console.log(family)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))