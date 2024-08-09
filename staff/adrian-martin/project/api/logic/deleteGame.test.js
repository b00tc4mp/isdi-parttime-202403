import 'dotenv/config'
import mongoose from 'mongoose'
import deleteGame from './deleteGame.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteGame('66a9e33d6fc36f64e9967e22', '66b5adeb34dfc1449587130f')
                //                  UserId                       GameId
                .then(() => console.log('Game deleted successfully'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))