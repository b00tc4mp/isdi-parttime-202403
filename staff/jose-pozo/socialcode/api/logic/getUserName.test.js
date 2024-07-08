import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from './getUserName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('668af4c0d0a759a2295dfbfc', '668af5f713baebbac1bb93c3', (error, name) => {
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
