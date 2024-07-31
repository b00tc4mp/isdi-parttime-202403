import 'dotenv/config'
import editUsername from './editUsername.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        editUsername('66a9e33d6fc36f64e9967e22', 'AdrianGon')
            .then(updatedUser => console.log('Username updated', updatedUser))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))