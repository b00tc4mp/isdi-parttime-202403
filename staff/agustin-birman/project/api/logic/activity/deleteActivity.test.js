import deleteActivity from './deleteActivity.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteActivity('66a94dcb34505782bcd8cfd0', '66afa3a0a5ccc42af55a6f25')
                .then(() => console.log('activity deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))