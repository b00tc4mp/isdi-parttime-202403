import getUserStats from './getUserStats.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserStats('66a94dcb34505782bcd8cfd0', '66a94dcb34505782bcd8cfd0')
                .then(userInfo => console.log(userInfo))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    }).catch(error => { console.error(error) })
