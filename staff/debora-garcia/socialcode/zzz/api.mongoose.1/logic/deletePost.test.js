import "dotenv/config"
import mongoose from "mongoose"

import deletePost from "./deletePost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            deletePost("Mongo", "66852320df75d9b14a6367c4", error => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log("post deleted")
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


//TODO modificar id post