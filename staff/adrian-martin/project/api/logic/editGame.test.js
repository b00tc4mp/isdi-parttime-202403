import 'dotenv/config'
import mongoose from 'mongoose'
import editGame from './editGame.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            // editGame(
            //     '66b5abd834dfc1449586b370',
            //     {
            //         title: 'Jack',
            //         image: 'https://i.ytimg.com/vi/dcbTsDWjEhM/maxresdefault.jpg',
            //         rating: 5,
            //         hours: 10
            //     }
            // )
            editGame(
                '66b5abd834dfc1449586b370',
                {
                    title: 'Jack & Daster',
                    // image: 'https://i.ytimg.com/vi/dcbTsDWjEhM/maxresdefault.jpg',
                    // rating: 5,
                    // hours: 10
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