import 'dotenv/config'
import mongoose from 'mongoose'

import deleteTask from './deleteTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteTask("66bc4451da0a179576c54969", "66bce4c9fa804dc563c8a8d8")
                .then(() => console.log('post deleted'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))