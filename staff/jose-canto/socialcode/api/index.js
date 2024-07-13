import "dotenv/config"
import express from 'express'
import cors from "cors"
import mongoose from "mongoose"

import routeHandler from "./handlers/index.js"
import handleErrorResponse from "./helper/handleErrorResponse.js"
import { SystemError } from "com/errors.js"

const { PORT, MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    const api = express()

    api.use(express.static("public"))

    api.use(cors())

    const jsonBodyParser = express.json({ strict: true, type: "application/json" })

    api.get("/", (req, res) => {
      res.send("Hello World")
    })
    api.post("/users", jsonBodyParser, routeHandler.registerUserHandler)

    api.post("/users/auth", jsonBodyParser, routeHandler.authenticaterUserHandler)

    api.get("/users/:targetUserId", routeHandler.getUserNameHandler)

    api.post("/posts", jsonBodyParser, routeHandler.createPostHandler)

    api.get('/posts', routeHandler.getAllPostsHandler)

    api.delete("/posts/:postId", routeHandler.deletePostHandler)

    api.patch("/posts/like/:postId", routeHandler.toggleLikePostHandler)

    api.patch("/posts/:postId/comments", jsonBodyParser, routeHandler.createPostCommentHandler)

    api.get("/posts/:postId/comments", routeHandler.getPostCommentsHandler)

    api.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}/app/login`))



    // Ruta para forzar un error
    api.get("/force-error", (req, res, next) => {
      const error = new Error("Forzando error para pruebas")
      next(error)
    });

    // Middleware de manejo de errores
    api.use((err, req, res, next) => {
      handleErrorResponse(err, res)
    })

  })
  .catch(error => console.error(error))