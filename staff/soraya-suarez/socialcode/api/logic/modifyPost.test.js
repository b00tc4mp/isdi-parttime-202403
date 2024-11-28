import 'dotenv/config'
import mongoose from 'mongoose'

import modifyPost from './modifyPost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyPost('668c2365a4605f941755e3b4', '669bfe93058d439b4cc9f3a1', 'Pedro Pedro', 'https://media.giphy.com/media/tHIRLHtNwxpjIFqPdV/giphy.gif?cid=82a1493bxyijfc4u0x27abqke4p17a4jwewo7y55jbeb94t7&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Pedro Pe')
                .then(() => console.log('updated post'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))