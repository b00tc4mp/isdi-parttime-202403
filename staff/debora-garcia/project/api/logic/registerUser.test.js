import "dotenv/config"
import mongoose from "mongoose"

import registerUser from "./registerUser.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser("Victor","Sanchez","test2@gmail.com", "victor", "1234", "1234")
                .then(() => console.log("user registered"))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))