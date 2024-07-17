import 'dotenv/config'
import mongoose from 'mongoose'

import editPostTitle from './editPostTitle.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            editPostTitle("668a739a50df84d483367be9", "668e9d4c0c347f08b5781df7", "Nuevo titulo")
                .then(() => console.log('post title edited'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
