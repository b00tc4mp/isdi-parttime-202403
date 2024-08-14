import "dotenv/config"
import mongoose from "mongoose";
import getAllUsers from "./getAllUsers.js";

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllUsers('66b9d14f63b2d4c0bba66349')
                .then((parent) => {
                    console.log(parent)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))