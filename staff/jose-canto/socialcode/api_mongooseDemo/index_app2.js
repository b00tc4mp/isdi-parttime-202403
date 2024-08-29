import express from 'express'
//import fs from "fs" 

import logic from "./logic/index_app2.js"

const api = express()

api.use(express.static("public"))

const jsonBodyParser = express.json({ strict: true, type: "application/json" })

api.get("/", (req, res) => {
  res.send("Hello World")
})


api.get('/posts', (req, res) => {
  // fs.readFile("./data/posts.json", "utf-8", (error, data) => {
  //   if (error) {
  //     res.status(500).json({ error: error.constructor.name, message: error.message })
  //     return
  //   }

  //   // res.setHeader("Content-Type", "application/json") otra opcion de enviar un header
  //   // res.send(data) otra opcion de enviar la data

  //   const posts = JSON.parse(data)

  //   res.json(posts)
  // })
  try {
    logic.getAllPosts((error, posts) => {
      if (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }

      res.json(posts)
    })
  } catch (error) {

    res.status(500).json({ error: error.constructor.name, message: error.message })
  }
})


// este endpoint no es necesario ya que obtenemos a todos los usuarios
// api.get('/users', (req, res) => {
//   fs.readFile("./data/users.json", "utf-8", (error, data) => {
//     if (error) {
//       res.status(500).json({ error: error.constructor.name, message: error.message })
//       return
//     }

//     // res.setHeader("Content-Type", "application/json") otra opcion de enviar un header
//     // res.send(data) otra opcion de enviar la data

//     const users = JSON.parse(data)

//     res.json(users)
//   })
// })


// function jsonBodyParser(req, res, next) {  En vez de montar nosotros el jsonBodyParser, lo utilizamos de forma nativa de express
//   const contentType = req.headers["content-type"]

//   if (contentType.includes("application/json")) {
//     let data = ""

//     req.on("data", chunk => {
//       data += chunk
//     })

//     req.on("end", () => {
//       const body = JSON.parse(data)

//       req.body = body
//       next()

//     })
//   } else {
//     next()
//   }
// }


api.post("/users", jsonBodyParser, (req, res) => {

  //const user = req.body

  // fs.readFile("./data/users.json", "utf-8", (error, existingData) => {
  //   if (error) {
  //     res.status(500).json({ error: error.constructor.name, message: error.message })
  //     return
  //   }

  //   const users = JSON.parse(existingData)
  //   users.push(user)

  //   const usersJson = JSON.stringify(users)

  //   fs.writeFile("./data/users.json", usersJson, error => {
  //     if (error) {
  //       res.status(500).json({ error: error.constructor.name, message: error.message })
  //       return
  //     }
  //     res.status(201).send(user)
  //   })
  // })

  const { username, password } = req.body
  try {
    logic.registerUser(username, password, (error) => {

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

      res.send()
      console.log(`User ${username} authenticated`)
      //console.log("User " + username + " authenticated")

    })

  } catch (error) {
    res.status(500).json({ error: error.constructor.name, message: error.message })
  }
})

api.get("/users/:targetUsername", (req, res) => {
  const username = req.headers.authorization.slice(6)

  const { targetUsername } = req.params

  try {
    logic.getUserName(username, targetUsername, (error, name) => {

      if (error) {

        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }

      res.json(name)
    })

  } catch (error) {

    res.status(500).json({ error: error.constructor.name, message: error.message })

  }
})

api.post("/posts", jsonBodyParser, (req, res) => {

  // const post = req.body

  // fs.readFile("./data/posts.json", "utf-8", (error, existingData) => {
  //   if (error) {
  //     res.status(500).json({ error: error.constructor.name, message: error.message })
  //     return
  //   }

  //   const posts = JSON.parse(existingData)
  //   posts.push(post)

  //   post.date = utils.getDateStringDayMonthYearFormat()
  //   post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

  //   const postsJson = JSON.stringify(posts)

  //   fs.writeFile("./data/posts.json", postsJson, error => {
  //     if (error) {
  //       res.status(500).json({ error: error.constructor.name, message: error.message })
  //       return
  //     }
  //     res.status(201).send(post)
  //   })
  // })

  const username = req.headers.authorization.slice(6) // cabezera para la autenticacion del usuario
  const { title, image, description, } = req.body


  try {
    logic.createPost(username, title, image, description, (error) => {

      if (error) {

        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }

      res.status(201).send()
    })

  } catch (error) {

    res.status(500).json({ error: error.constructor.name, message: error.message })
    return

  }
})


api.delete("/posts/:postId", (req, res) => {
  const username = req.headers.authorization.slice(6) // cabezera para la autenticacion del usuario

  const { postId } = req.params

  try {
    logic.deletePost(username, postId, (error) => {
      if (error) {

        res.status(500).json({ error: error.constructor.name, message: error.message })
        return
      }
    })

    res.status(204).send()


  } catch (error) {

    res.status(500).json({ error: error.constructor.name, message: error.message })

  }
})

api.listen(8080, () => console.log('listening on port http://localhost:8080/app2/register'))