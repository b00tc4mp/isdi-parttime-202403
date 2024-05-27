// const express = require("express")
import express, { json } from "express"
import fs from "fs"
const api = express()

api.get("/posts", (req, res) => {
    fs.readFile("./data/posts.json", "utf8", (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }
        /* res.setHeader("Content-Type", "application/json")
        res.send(json) */

        //convertimos primero a objeto json para poder emplear el metodo json ya que 
        //json ya lleva incorporado el Content-Type
        const posts = JSON.parse(json)
        res.json(posts)
    })
})

// para recoger el codigo de request y evitar repeticion se utiliza el middleware que recoje el json
// next te envia un mtodo que avisa cuando acaba de procesar y le manda al siguiente middleware, con lo que los objetos que reciben
// se pasan al siguiente middleware
function jsonBodyParser(req, res, next) {

    //hay que verificar primero que no hay error a la hora de enviar el documento a parsear.
    //solo parsea si se ha envido la cabecera correcta, es decir application/json
    const contentType = req.headers["content-type"]
    if (contentType.includes("application/json")) {
        let json = ""

        req.on("data", chunk => json += chunk.toString())

        req.on("end", () => {
            //body que recivimos de la req
            const body = JSON.parse(json)
            //ponemos body como propiedad del objeeto
            req.body = body

            next()
        })
    } else next()



}

//creamos nuevo usuario
// añadimos el objecto jsonBodyParser
// ej jsonBodyParser ya introduce el req mutado, poniendo la propiedad body(parseado)
api.post("/users", jsonBodyParser, (req, res) => {
    //el user es lo que recibe en body de la req
    const user = req.body

    fs.readFile("./data/users.json", "utf8", (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }
        const users = JSON.parse(json)
        users.push(user)

        const newJson = JSON.stringify(users)


        fs.writeFile("./data/users.json", newJson, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error })

                return
            }
            res.status(201).send()
        })

    })
})

// creamos nuevo post
api.post("/posts", jsonBodyParser, (req, res) => {
    const post = req.body

    fs.readFile("./data/posts.json", "utf8", (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }
        const posts = JSON.parse(json)
        //creamos id y date para añadir al post
        post.id = `${Math.random().toString().slice(2)}-${Date.now()}`
        post.date = new Date().toISOString()
        posts.push(post)

        const newJson = JSON.stringify(posts)

        fs.writeFile("./data/posts.json", newJson, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error })

                return
            }
            res.status(201).send()
        })
    })

})


api.listen(8080, () => console.log("api is up"))