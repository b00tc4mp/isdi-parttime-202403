import "dotenv/config"
import mongoose from "mongoose";
import getAllUsers from "./getAllUsers.js";

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllUsers("users")
                .then((role) => {
                    console.log(role)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))