import 'dotenv/config'
import mongoose from 'mongoose'

import editPostTitle from './editPostTitle.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            editPostTitle("6691574c8ed9f067959c8f21", "6696331a7fa4ac5f0af3c4cd", "Titulo nuevo")
                .then(() => console.log('post title edited'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))