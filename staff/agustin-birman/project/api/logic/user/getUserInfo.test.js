import getUserInfo from './getUserInfo.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserInfo('66a94dcb34505782bcd8cfd0', '66abce851a0dc4acbe205e41')
                .then(userInfo => console.log(userInfo))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    }).catch(error => { console.error(error) })
