import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from './getUserName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('668bf6db2c12b9a873e4cd2f', '668bf0d070e99e711ec35ee0', (error, name) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user name retrieved', name)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
