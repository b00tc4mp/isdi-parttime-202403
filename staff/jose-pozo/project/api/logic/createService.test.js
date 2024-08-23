import 'dotenv/config'
import mongoose from 'mongoose'

import createService from './createService.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createService('66c22fff698c8a8604ee561a', 'Cajas', '', '', 60, 50)

                .then(() => console.log('service created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))