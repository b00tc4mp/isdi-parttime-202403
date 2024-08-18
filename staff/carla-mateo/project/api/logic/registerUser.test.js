import "dotenv/config"
import mongoose from "mongoose"
import registerUser from "./registerUser.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser("66c17a57d5459e91494a6191", "CASA", "hugo", "hugo@email.com", "1234", "user")
                .then(() => {
                    console.log("User Created")
                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))