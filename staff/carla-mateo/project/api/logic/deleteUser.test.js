import 'dotenv/config'
import mongoose from 'mongoose'

import deleteUser from './deleteUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteUser("66c6d796e8e6065c0dc81b2f")
                .then(() => { })
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))