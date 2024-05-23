import express from 'express'
import fs from "fs"

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

api.listen(8080, () => console.log('listening on port http://localhost:8080'))