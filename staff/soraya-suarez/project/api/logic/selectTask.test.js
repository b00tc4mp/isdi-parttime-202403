import 'dotenv/config'
import mongoose from 'mongoose'

import selectTask from './selectTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            selectTask('66b4bdcc64ab6e0c4cc166ce', '66bbc258186bac28f093a600')
                .then(() => console.log('task selected'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))