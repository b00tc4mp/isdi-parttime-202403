import 'dotenv/config'
import mongoose from 'mongoose'

import createPostComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() =>{
        try{
            createPostComment('6686d504965fe46a41b0d7a2', '6693e7eb4bb7c4e78a0b3b2a', 'hola' )
                .then(() => console.log('comment created'))
                .catch(error => console.error(error))
        }catch(error){
            console.error(error)
        }
    })
    .catch(error => console.error(error))