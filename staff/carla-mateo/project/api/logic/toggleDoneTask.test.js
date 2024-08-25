import 'dotenv/config'
import mongoose from 'mongoose'

import toggleDoneTask from './toggleDoneTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleDoneTask('66cad28961562baeee7c8e43', '66cb5cfbce0823db99873052')
                .then(() => console.log('user toggled done'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))