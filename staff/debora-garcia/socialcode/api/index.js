import "dotenv/config"
import express from "express"
import logic from "./logic/index.js"
import cors from "cors"
import { CredentialsError, SystemError } from 'com/errors.js'
import mongoose from "mongoose"
import handleErrorResponse from "./helper/handlerErrorResponse.js"
import routeHandler from "./handlers/index.js"


import jwt from "./utils/jsonwebtoken-promised.js"

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(express.static("public"))

        api.use(cors())

        const jsonBodyParser = express.json({ strict: true, type: "application/json" })


        //comprobamos que la api funciona
        api.get("/", (req, res) => res.send("Hello world"))

        //creamos nuevo usuario
        api.post("/users", jsonBodyParser, routeHandler.registerUserHandler)
        //autentificacion de usuario
        api.post("/users/auth", jsonBodyParser, routeHandler.authenticateUserHandler)
        //getUsername
        api.get("/users/:targetUserId", routeHandler.getUsernameHandler)
        //getPosts
        api.get("/posts", routeHandler.getPostsHandler)
        //creamos nuevo post
        api.post("/posts", jsonBodyParser, routeHandler.createPostHandler)
        // eliminamos un post
        api.delete("/posts/:postId", routeHandler.deletePostHandler)

        api.patch("/posts/:postId/likes", routeHandler.toggleLikePostHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))

    })
    .catch(error => console.error(error))
