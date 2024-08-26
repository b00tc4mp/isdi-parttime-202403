import addStudent from './addStudent.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            addStudent('66a94dcb34505782bcd8cfd0', '66abce851a0dc4acbe205e41')
                .then(() => console.log('user add'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    }).catch(error => { console.error(error) })
