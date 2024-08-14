import "dotenv/config"
import mongoose from "mongoose"
import registerUser from "./registerUser.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser("66bc4451da0a179576c54969", "sonia", "casaPrueba", "sonia@email.com", "1234", "user")
                .then(() => {
                    console.log("User Created")
                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))