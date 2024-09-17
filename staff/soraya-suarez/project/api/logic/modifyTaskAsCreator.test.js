import 'dotenv/config'
import mongoose from 'mongoose'

import modifyTaskAsCreator from './modifyTaskAsCreator.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyTaskAsCreator('66b4c032d54497eae7195f22', '66bb8e5a186bac28f093a5fa', 'Probando', 'Cambiando como creador', 'high')
                .then(() => console.log('updated task as creator'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))