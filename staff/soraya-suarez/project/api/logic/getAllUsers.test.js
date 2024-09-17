import 'dotenv/config'
import mongoose from 'mongoose'

import getAllUsers from './getAllUsers.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllUsers('66b4c032d54497eae7195f22', (error, users) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('users retrieved', users)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))