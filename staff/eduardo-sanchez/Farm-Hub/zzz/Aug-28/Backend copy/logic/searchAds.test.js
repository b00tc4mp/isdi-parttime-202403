import 'dotenv/config'
import mongoose from 'mongoose'

import searchAds from './searchAds.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            searchAds('pi')
                .then(ads => console.log('ads with search query retrieved', ads))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))