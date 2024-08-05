import 'dotenv/config'
import mongoose from 'mongoose'

import createGame from './createGame.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createGame('66a9e33d6fc36f64e9967e22', 'Baldurs Gate 3', 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37e49fba1a572ea3b89971ee7b.jpg', '10', '350')
                // userId, title, image, rating, hours
                .then(game => console.log('game created', game))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))