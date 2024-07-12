import "dotenv/config"
import express from 'express'
import cors from "cors"
import logic from "./logic/index.js"
import { SystemError, CredentialsError } from "com/errors.js"
import mongoose from "mongoose"

import jwt from "./utils/jsonwebtoken-promised.js"


const { PORT, JWT_SECRET, MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    const api = express()

    api.use(express.static("public"))

    api.use(cors())

    const jsonBodyParser = express.json({ strict: true, type: "application/json" })

    api.get("/", (req, res) => {
      res.send("Hello World")
    })

    api.get('/posts', (req, res) => {
      try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload

            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 2

            try {
              logic.getAllPosts(userId, page, limit)
                .then((posts) => {
                  res.json(posts)
                })
                .catch((error) => {
                  handleErrorResponse(error, res)
                })
            } catch (error) {
              handleErrorResponse(error, res)
            }
          })
          .catch((error) => handleErrorResponse(new CredentialsError(error.message), res))

      } catch (error) {
        handleErrorResponse(error, res)
      }
    })

    api.post("/users", jsonBodyParser, (req, res) => {
      try {
        const { name, surname, email, username, password, passwordRepeat } = req.body

        logic.registerUser(name, surname, email, username, password, passwordRepeat)
          .then(() => res.status(201).send())
          .catch((error) => handleErrorResponse(error, res))
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })

    api.post("/users/auth", jsonBodyParser, (req, res) => {
      try {
        const { username, password } = req.body

        logic.authenticateUser(username, password)
          .then((userId) => {
            jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "7d" })
              .then((token) => {
                res.json(token)
                console.log(`User ${username} authenticated`)
              })
              .catch((error) => handleErrorResponse(new SystemError(error.message), res))
          })
          .catch((error) => handleErrorResponse(error, res))
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })

    api.get("/users/:targetUserId", (req, res) => {

      try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload

            const { targetUserId } = req.params
            try {
              logic.getUserName(userId, targetUserId)
                .then((name) => res.json(name))
                .catch((error) => handleErrorResponse(error, res))
            } catch (error) {
              handleErrorResponse(error, res)
            }
          })
          .catch((error) => handleErrorResponse(new CredentialsError(error.message), res))
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })

    api.post("/posts", jsonBodyParser, (req, res) => {
      try {
        const token = req.headers.authorization.slice(7) // cabezera para la autenticacion del usuario

        jwt.verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload

            const { title, image, description, } = req.body

            try {
              logic.createPost(userId, title, image, description)
                .then(() => {
                  res.status(201).send()
                })
                .catch(() => {
                  handleErrorResponse(error, res)
                })
            } catch (error) {
              handleErrorResponse(error, res)
            }
          })
          .catch((error) => handleErrorResponse(new CredentialsError(error.message), res))
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })

    api.delete("/posts/:postId", (req, res) => {
      try {
        const token = req.headers.authorization.slice(7) // cabezera para la autenticacion del token

        jwt.verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload

            const { postId } = req.params

            try {
              logic.deletePost(userId, postId)
                .then(() => {
                  res.status(204).send()
                })
                .catch((error) => {
                  handleErrorResponse(error, res)
                })
            } catch (error) {
              handleErrorResponse(error, res)
            }
          })
          .catch((error) => handleErrorResponse(new CredentialsError(error.message), res))
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })

    api.patch("/posts/like/:postId", (req, res) => {
      try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload

            const { postId } = req.params

            try {
              logic.toggleLike(userId, postId)
                .then(() => {
                  res.status(204).send()
                })
                .catch((error) => handleErrorResponse(error, res))
            } catch {
              handleErrorResponse(error, res)
            }
          })
          .catch((error) => handleErrorResponse(new CredentialsError(error.message), res))
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })

    api.patch("/posts/:postId/comments", jsonBodyParser, (req, res) => {

      try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload

            const { postId } = req.params

            const { text } = req.body

            try {
              logic.createPostComment(userId, postId, text)
                .then(() => {
                  res.status(201).send()
                })
                .catch((error) => {
                  handleErrorResponse(error, res)
                })
            } catch (error) {
              handleErrorResponse(error, res)
            }
          })
          .catch((error) => handleErrorResponse(new CredentialsError(error.message), res))
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })

    api.get("/posts/:postId/comments", (req, res) => {

      try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload

            const { postId } = req.params

            try {
              logic.getPostComments(userId, postId)
                .then((comments) => {
                  res.json(comments)
                })
                .catch((error) => {
                  handleErrorResponse(error, res)
                })
            } catch (error) {
              handleErrorResponse(error, res)
            }
          })
          .catch((error) => handleErrorResponse(new CredentialsError(error.message), res))
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })
    api.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}/app/login`))
  })
  .catch(error => console.error(error))