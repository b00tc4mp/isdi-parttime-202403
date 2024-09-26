import mongoose from 'mongoose'
import 'dotenv/config'
import getTeachersActivities from './getTeachersActivities.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getTeachersActivities('66a94dcb34505782bcd8cfd0')
                .then(activities => console.log('activity retrieved', activities))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
