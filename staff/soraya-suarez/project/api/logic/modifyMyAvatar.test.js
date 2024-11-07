import 'dotenv/config'
import mongoose from 'mongoose'

import modifyMyAvatar from './modifyMyAvatar.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyMyAvatar('66c1b645fe842c9b2769c0c8', 'https://media.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif?cid=790b761195b35mlra5be9aswcffwy0p1t0oscj4882qjqfma&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
                .then(() => console.log('updated avatar of user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))