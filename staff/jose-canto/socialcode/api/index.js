import "dotenv/config"
import express from 'express'
import cors from "cors"
import logic from "./logic/index.js"
import jwt from "jsonwebtoken"
import errors from "com/errors.js"

const { PORT, JWT_SECRET } = process.env


const { SystemError } = errors

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

    const { sub: username } = jwt.verify(token, JWT_SECRET)

    logic.getAllPosts(username, (error, posts) => {
      if (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }

      res.json(posts)
    })
  } catch (error) {

    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

      res.status(500).json({ error: SystemError.name, message: error.message })
    } else {

      res.status(500).json({ error: error.constructor.name, message: error.message })
    }
  }
})

api.post("/users", jsonBodyParser, (req, res) => {

  const { name, surname, email, username, password, passwordRepeat } = req.body
  try {
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

  // const username = req.body.username
  // const password = req.body.password

  const { username, password } = req.body

  try {
    logic.authenticateUser(username, password, error => {

      if (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }

      const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: "7d" })

      res.json(token)
      console.log(`User ${username} authenticated`)
    })

  } catch (error) {
    res.status(500).json({ error: error.constructor.name, message: error.message })
  }
})

api.get("/users/:targetUsername", (req, res) => {

  try {
    const token = req.headers.authorization.slice(7)

    const { sub: username } = jwt.verify(token, JWT_SECRET)

    const { targetUsername } = req.params

    logic.getUserName(username, targetUsername, (error, name) => {

      if (error) {

        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }

      res.json(name)
    })

  } catch (error) {

    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

      res.status(500).json({ error: SystemError.name, message: error.message })
    } else {

      res.status(500).json({ error: error.constructor.name, message: error.message })
    }
  }
})



api.post("/posts", jsonBodyParser, (req, res) => {
  try {
    const token = req.headers.authorization.slice(7) // cabezera para la autenticacion del usuario

    const { sub: username } = jwt.verify(token, JWT_SECRET)

    const { title, image, description, } = req.body

    logic.createPost(username, title, image, description, (error) => {

      if (error) {

        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }

      res.status(201).send()
    })

  } catch (error) {
    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

      res.status(500).json({ error: SystemError.name, message: error.message })
    } else {

      res.status(500).json({ error: error.constructor.name, message: error.message })
    }
  }
})


api.delete("/posts/:postId", (req, res) => {
  try {
    const token = req.headers.authorization.slice(7) // cabezera para la autenticacion del token

    const { sub: username } = jwt.verify(token, JWT_SECRET)

    const { postId } = req.params

    logic.deletePost(username, postId, (error) => {
      if (error) {

        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }
      res.status(204).send()
    })

  } catch (error) {
    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

      res.status(500).json({ error: SystemError.name, message: error.message })
    } else {

      res.status(500).json({ error: error.constructor.name, message: error.message })
    }
  }
})


api.post("/posts/like/:postId", (req, res) => {

  const token = req.headers.authorization.slice(7)
  const { sub: username } = jwt.verify(token, JWT_SECRET)
  const { postId } = req.params

  try {

    logic.toggleLike(username, postId, (error) => {
      if (error) {

        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }
      res.status(200).send()
    })

  } catch (error) {
    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

      res.status(500).json({ error: SystemError.name, message: error.message })
    } else {

      res.status(500).json({ error: error.constructor.name, message: error.message })
    }
  }
})

api.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}/app/login`))