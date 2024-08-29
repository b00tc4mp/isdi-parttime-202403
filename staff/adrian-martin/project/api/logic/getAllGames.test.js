import 'dotenv/config'
import mongoose from 'mongoose'

import getAllGames from './getAllGames.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllGames('66a9e33d6fc36f64e9967e22')
                .then(games => console.log('games retrived', games))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))