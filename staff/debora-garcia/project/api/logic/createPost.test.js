import "dotenv/config"
import mongoose from "mongoose"
import { Result } from "../data/index.js"

import createPost from "./createPost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            const result = new Result({
                workout: '66b46fce589823a33b52cca2',
                athlete: '66b0b8ff337c2b614a26583b',
                time: 30,
                repetitions: 10,
                weight: 50,
                date: Date.now()
            });
            return result.delete()
                .catch(error => console.error(error))
                .then(() => {
                    console.log("result created")
                    return createPost("66b0b8ff337c2b614a26583b", "66b46fce589823a33b52cca2", "https://cdn.shopify.com/s/files/1/0274/4621/4721/files/wod-danielle-brandon.jpg?v=1678990866", "my first post")
                })

                .then(() => console.log("post created"))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
