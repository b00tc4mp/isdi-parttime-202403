import mongoose from 'mongoose'
import 'dotenv/config'
import removeTeacher from './removeTeacher.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            removeTeacher('66abce851a0dc4acbe205e41', '66a94dcb34505782bcd8cfd0')
                .then(() => console.log('user removed'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    }).catch(error => { console.error(error) })
