import 'dotenv/config'
import getUserName from './getUserName.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('AdrianGon', 'AdrianGon', (error, name) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('username retrived', name)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))