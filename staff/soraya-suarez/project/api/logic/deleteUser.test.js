import 'dotenv/config'
import mongoose from 'mongoose'

import deleteUser from './deleteUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteUser('66b4bdcc64ab6e0c4cc166ce', '66b4ae88f13b3d6e5ce25bac', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user deleted')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))