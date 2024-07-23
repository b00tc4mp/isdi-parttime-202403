import mongoose from 'mongoose'
import {User  } from './index.js'

mongoose.connect(`${MONGO_URL}/test`)
    .then(() =>{
        User.create({ name: 'Super', surname: 'Woman', email:'super@Woman.com'})
    })
    .catch(error => console.error(error))