import 'dotenv/config'
import mongoose from 'mongoose'

import addTask from './addTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            addTask('66afc674cc8e7c4304f65b8d', '66afc674cc8e7c4304f65b8d', 'AÑADIR  con mismo creador y propietario', 'DESCRIBIENDO', 'toDo', 'low', true, '', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post created')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))