import 'dotenv/config'
import mongoose from 'mongoose'

import deleteTask from './deleteTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteTask("66b9d14f63b2d4c0bba66349", "66ba4574fd364b27b7ba180d")
                .then(() => console.log('post deleted'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))