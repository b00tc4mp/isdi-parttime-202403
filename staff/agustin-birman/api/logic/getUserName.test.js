import mongoose from 'mongoose'
import getUserName from './getUserName.js'
import 'dotenv/config'


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('peterpan', 'pepitogrillo', (error, name) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user name retrieved', name)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
