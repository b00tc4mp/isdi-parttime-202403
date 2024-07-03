import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            authenticateUser('AdrianGon', '321321321', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user authenticated')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
