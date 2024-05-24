import express from 'express'
import fs from "fs"

import utils from "../app/utils.js"

const api = express()

api.get('/posts', (req, res) => {
  fs.readFile("./data/posts.json", "utf-8", (error, data) => {
    if (error) {
      res.status(500).json({ error: error.constructor.name, message: error.message })
      return
    }

    // res.setHeader("Content-Type", "application/json") otra opcion de enviar un header
    // res.send(data) otra opcion de enviar la data

    const posts = JSON.parse(data)

    res.json(posts)
  })
})

api.get('/users', (req, res) => {
  fs.readFile("./data/users.json", "utf-8", (error, data) => {
    if (error) {
      res.status(500).json({ error: error.constructor.name, message: error.message })
      return
    }

    // res.setHeader("Content-Type", "application/json") otra opcion de enviar un header
    // res.send(data) otra opcion de enviar la data

    const users = JSON.parse(data)

    res.json(users)
  })
})

api.post("/users", (req, res) => {
  let data = ""

  req.on("data", chunk => {
    data += chunk
  })

  req.on("end", () => {
    const user = JSON.parse(data)

    fs.readFile("./data/users.json", "utf-8", (error, existingData) => {
      if (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }

      const users = JSON.parse(existingData)
      users.push(user)

      const usersJson = JSON.stringify(users)

      fs.writeFile("./data/users.json", usersJson, error => {
        if (error) {
          res.status(500).json({ error: error.constructor.name, message: error.message })
          return
        }
        res.status(201).send(user)
      })
    })
  })
})

api.post("/posts", (req, res) => {
  let data = ""

  req.on("data", chunk => {
    data += chunk
  })

  req.on("end", () => {
    const post = JSON.parse(data)

    fs.readFile("./data/posts.json", "utf-8", (error, existingData) => {
      if (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }

      const posts = JSON.parse(existingData)
      posts.push(post)

      post.date = utils.getDateStringDayMonthYearFormat()
      post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

      const postsJson = JSON.stringify(posts)

      fs.writeFile("./data/posts.json", postsJson, error => {
        if (error) {
          res.status(500).json({ error: error.constructor.name, message: error.message })
          return
        }
        res.status(201).send(post)
      })
    })
  })
})

api.listen(8080, () => console.log('listening on port http://localhost:8080'))