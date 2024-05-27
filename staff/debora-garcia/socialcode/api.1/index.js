// const express = require("express")
import express from "express"
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

//creamos nuevo usuario
//la parte de body se envia como stream de datos
api.post("/users", (req, res) => {
    //permit escuchar data. Cuando llega un dato(chunk) pone en cola el proceso de callback
    //los bytes del chunk los convertimos a string para que los pueda interpretar

    /* req.on("data", chunk => console.log(chunk.toString()))*/

    //cuando hay mucho data se acumulan
    let json = ""

    req.on("data", chunk => json += chunk.toString())

    // final del stream de data, enviar lo que se ha acumulado de data. El body que han enviado al server
    // Convertimos a objeto json del usuario que se registra, y guardarlo en la coleccion users
    // Primero hay que leer el users.json: convertirlo a array-push-json-guardar en disco 

    req.on("end", () => {
        const user = JSON.parse(json)

        fs.readFile("./data/users.json", "utf8", (error, json) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }
            const users = JSON.parse(json)
            users.push(user)

            //const newJson = JSON.stringify(users, null, 4)-- se usa para formatear el json pero no se usa.
            const newJson = JSON.stringify(users)

            // sobreescribimos el archivo con el nuevo contenido
            // writeFile solo admite un parametro de error->nulo;  o no nulo->ok
            fs.writeFile("./data/users.json", newJson, error => {
                if (error) {
                    res.status(500).json({ error: error.constructor.name, message: error.message })

                    return
                }

                if (error) {
                    res.status(500).json({ error: error.constructor.name, message: error })

                    return
                }
                //201 se usa cuando se crea algo, y se envia un un body vacio.
                res.status(201).send()
            })
        })
    })
})

// creamos nuevo post
api.post("/posts", (req, res) => {

    let json = ""

    req.on("data", chunk => json += chunk.toString())

    req.on("end", () => {
        const post = JSON.parse(json)

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
})


api.listen(8080, () => console.log("api is up"))