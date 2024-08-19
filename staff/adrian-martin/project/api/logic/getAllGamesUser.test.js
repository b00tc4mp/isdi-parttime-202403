import 'dotenv/config'
import mongoose from 'mongoose'

import getAllGamesUser from './getAllGamesUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllGamesUser('66c37ea3dcfec335d1843ba3')
                .then(games => console.log('games retrived user', games))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))