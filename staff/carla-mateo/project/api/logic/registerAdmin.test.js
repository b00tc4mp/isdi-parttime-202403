import "dotenv/config"
import mongoose from "mongoose"
import registerAdmin from "./registerAdmin.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerAdmin("Mateo", "carla", "carla@email.com", "1234", "1234", "admin")
                .then(() => {
                    console.log("User Created")
                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))