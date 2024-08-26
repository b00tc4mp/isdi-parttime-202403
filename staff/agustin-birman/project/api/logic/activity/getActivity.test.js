import mongoose from 'mongoose'
import 'dotenv/config'
import getActivity from './getActivity.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getActivity('66a94dcb34505782bcd8cfd0', '66c1fbba04735a9cfdd94859')
                .then(activities => console.log('activity retrieved', activities))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
