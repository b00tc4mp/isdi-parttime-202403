import "dotenv/config"
import mongoose from "mongoose";
import getAllTasks from "./getAllTasks.js";

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllTasks('66bc4451da0a179576c54969')
                .then((parent) => {
                    console.log(parent)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))