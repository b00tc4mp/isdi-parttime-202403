import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from './getUserName.js'

const { MONGODB_URL } = process.env

mongoose.connect()
    .then(connection => {
        try {
            getUserName('peterpan', 'DaenerysTargaryen', (error, name) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('name retrieved', name)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
