import mongoose from 'mongoose'
import 'dotenv/config'
import getActivities from './getActivities.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getActivities('66a94dcb34505782bcd8cfd0')
                .then(activities => console.log('activities retrieved', activities))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
