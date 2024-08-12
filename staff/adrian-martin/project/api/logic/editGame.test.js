import 'dotenv/config'
import mongoose from 'mongoose'
import editGame from './editGame.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            editGame(
                '66a9e33d6fc36f64e9967e22', '66b811a84632cead45a0f3e4',
                {
                    title: 'Jack',
                    image: 'https://i.ytimg.com/vi/dcbTsDWjEhM/maxresdefault.jpg',
                    rating: 5,
                    hours: 10
                }
            )
                .then(() => {
                    console.log("Game edited")
                })
                .catch((error) => console.error(error.message))

        } catch (error) {
            console.error(error.message)
        }
    })
    .catch(error => console.error(error))