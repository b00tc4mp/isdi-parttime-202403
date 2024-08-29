import 'dotenv/config'
import mongoose from 'mongoose'
import getAllGamesTargetUser from './getAllGamesTargetUser.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            // getAllGamesTargetUser('66c4cf978c769799b033ac61', '66c4d34a8c769799b033ac9a')
            getAllGamesTargetUser('66c4d34a8c769799b033ac9a', '66c4cf978c769799b033ac61')
                .then(games => console.log('Games retrived target user', games))
                .catch(error => console.error(error))
        } catch (error) {

        }
    })
    .catch(error => { console.error(error) })