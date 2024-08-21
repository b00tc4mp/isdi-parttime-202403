import "dotenv/config"
import mongoose from "mongoose"

import getTasksForDay from "./getTasksForDay.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getTasksForDay('66c4e1645977091ceb8b584d', '22')
                .then((family) => {
                    console.log(family)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))