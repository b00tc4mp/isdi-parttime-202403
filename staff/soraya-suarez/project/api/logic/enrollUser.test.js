import 'dotenv/config'
import mongoose from 'mongoose'

import enrollUser from './enrollUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            enrollUser('Agustin', 'Suarez', 'agustin2@suarez.com', 'admin', '66859a59d54c3bf8f5e205da', '123123123', '123123123',  error => {
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