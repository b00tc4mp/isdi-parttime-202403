import 'dotenv/config'
import mongoose from 'mongoose'

import enrollUser from './enrollUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            enrollUser('Soraya', 'Suarez', 'soraya@srz.com', 'admin', '66b4af595e592d857b4fb90d', '123123123', '123123123',  error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user enrolled')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))