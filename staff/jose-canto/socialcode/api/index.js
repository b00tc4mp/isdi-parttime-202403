import "dotenv/config"
import express from 'express'
import cors from "cors"
import logic from "./logic/index.js"
import jwt from "jsonwebtoken"
import { SystemError } from "com/errors.js"

import { MongoClient } from "mongodb"
import data from "./data/index.js"

const { PORT, JWT_SECRET, MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
  .then(connection => {
    const db = connection.db("test")

    const users = db.collection("users")
    const posts = db.collection("posts")

    data.users = users
    data.posts = posts

    const { JsonWebTokenError, TokenExpiredError } = jwt

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

        jwt.verify(token, JWT_SECRET, (error, payload) => {

          if (error) {

            if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

              res.status(500).json({ error: SystemError.name, message: error.message })
            } else {

              res.status(500).json({ error: error.constructor.name, message: error.message })
            }

            return
          }

          const { sub: username } = payload

          const page = parseInt(req.query.page) || 1
          const limit = parseInt(req.query.limit) || 2

          logic.getAllPosts(username, page, limit, (error, posts) => {
            if (error) {
              res.status(500).json({ error: error.constructor.name, message: error.message })
              return
            }

            res.json(posts)
          })
        })

      } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
      }
    })

    api.post("/users", jsonBodyParser, (req, res) => {
      try {
        const { name, surname, email, username, password, passwordRepeat } = req.body

        logic.registerUser(name, surname, email, username, password, passwordRepeat, (error) => {

          if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
            return
          }

          res.status(201).send()
        })

      } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
      }
    })


    api.post("/users/auth", jsonBodyParser, (req, res) => {
      try {
        const { username, password } = req.body

        logic.authenticateUser(username, password, error => {

          if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
            return
          }

          jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: "7d" }, (error, token) => {

            if (error) {

              res.status(500).json({ error: error.constructor.name, message: error.message })
              return
            }

            res.json(token)
          })

          console.log(`User ${username} authenticated`)
        })

      } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
      }
    })

    api.get("/users/:targetUsername", (req, res) => {

      try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET, (error, payload) => {
          if (error) {

            if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

              res.status(500).json({ error: SystemError.name, message: error.message })
            } else {

              res.status(500).json({ error: error.constructor.name, message: error.message })
            }
            return
          }

          const { sub: username } = payload

          const { targetUsername } = req.params

          logic.getUserName(username, targetUsername, (error, name) => {

            if (error) {

              res.status(500).json({ error: error.constructor.name, message: error.message })
              return
            }

            res.json(name)
          })
        })

      } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
      }
    })



    api.post("/posts", jsonBodyParser, (req, res) => {
      try {
        const token = req.headers.authorization.slice(7) // cabezera para la autenticacion del usuario

        jwt.verify(token, JWT_SECRET, (error, payload) => {

          if (error) {

            if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

              res.status(500).json({ error: SystemError.name, message: error.message })
            } else {

              res.status(500).json({ error: error.constructor.name, message: error.message })
            }
            return
          }

          const { sub: username } = payload

          const { title, image, description, } = req.body

          logic.createPost(username, title, image, description, (error) => {

            if (error) {

              res.status(500).json({ error: error.constructor.name, message: error.message })
              return
            }

            res.status(201).send()
          })
        })


      } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
      }
    })


    api.delete("/posts/:postId", (req, res) => {
      try {
        const token = req.headers.authorization.slice(7) // cabezera para la autenticacion del token

        jwt.verify(token, JWT_SECRET, (error, payload) => {

          if (error) {
            if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

              res.status(500).json({ error: SystemError.name, message: error.message })
            } else {

              res.status(500).json({ error: error.constructor.name, message: error.message })
            }
            return
          }
          const { sub: username } = payload

          const { postId } = req.params

          logic.deletePost(username, postId, (error) => {
            if (error) {

              res.status(500).json({ error: error.constructor.name, message: error.message })
              return
            }
            res.status(204).send()
          })
        })

      } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
      }
    })


    api.patch("/posts/like/:postId", (req, res) => {
      try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET, (error, payload) => {
          if (error) {
            if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

              res.status(500).json({ error: SystemError.name, message: error.message })
            } else {

              res.status(500).json({ error: error.constructor.name, message: error.message })
            }
            return
          }

          const { sub: username } = payload

          const { postId } = req.params

          logic.toggleLike(username, postId, (error) => {
            if (error) {

              res.status(500).json({ error: error.constructor.name, message: error.message })
              return
            }
            res.status(200).send()
          })
        })

      } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
      }
    })

    api.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}/app/login`))
  })
  .catch(error => console.error(error))