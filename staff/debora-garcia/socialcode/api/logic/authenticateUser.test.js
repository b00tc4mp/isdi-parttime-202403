import "dotenv/config"
import { MongoClient } from "mongodb"
import data from "../data/index.js"

import logic from "./index.js"
const { MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db("test")

        const users = db.collection("users")

        data.users = users

        try {
            logic.authenticateUser("Debi", "1234", error => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log("user authenticated")
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

    //add mongo db to api inject user collections in data; update register user and authenticate user logics to use mongo; update test and sh scripts for them #144