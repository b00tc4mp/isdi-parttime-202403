import 'dotenv/config'
import mongoose from 'mongoose'

import deleteService from './deleteService.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteService('66c89602041ae8e5a3cbc5c4', '66cb4fdc1b0a4f8e5d374e58')
                .then((user) => console.log('service deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))