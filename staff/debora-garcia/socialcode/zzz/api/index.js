// const express = require("express")
//import express, { json } from "express"
import express from "express"
import fs from "fs"
import logic from "./logic/index.js"

const api = express()

// express ya tiene montado el jsonBodyParser

const jsonBodyParser = express.json({ strict: true, type: "application/json" })

api.use(express.static("public"))


api.get("/posts", (req, res) => {
    /*  fs.readFile("./data/posts.json", "utf8", (error, json) => {
         if (error) {
             res.status(500).json({ error: error.constructor.name, message: error.message })
 
             return
         }
 
         const posts = JSON.parse(json)
         res.json(posts)
     }) */

    try {//recibimos dos parametros que son los que devuelve la funcion getPosts en logic
        logic.getPosts((error, posts) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }
            res.json(posts) //automaticamente enviara estado 200
        })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

//comprobamos que la api funciona

api.get("/", (req, res) => res.send("Hello world"))

//creamos nuevo usuario

api.post("/users", jsonBodyParser, (req, res) => {
    //ahora ya hay separacion de responsabilidades con lo que no usamos data en este archivo
    const { email, username, password, passwordRepeat } = req.body

    try {
        logic.registerUser(email, username, password, passwordRepeat, error => {
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

api.get("/users/:targetUsername", (req, res) => {
    //con target podemos recuperar el nombre de otro usuario
    //en este caso las credenciales coinciden con el id, pero la forma correcta es usar un id diferente del username
    const username = req.headers.authorization.slice(6) //a partir del caracter 6 de la cabecera

    const { targetUsername } = req.params

    try {
        logic.getUsername(username, targetUsername, (error, username) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(username)
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }



})

//autentificacion de usuario
api.post("/users/auth", jsonBodyParser, (req, res) => {
    //ahora ya hay separacion de responsabilidades con lo que no usamos data en este archivo

    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }
            //status(200) ya que no estanos construiendo nada pero no hace falta por que lo devuelve por defecto
            //send() es cuando no enviamos nada
            res.send()
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

// creamos nuevo post
api.post("/posts", jsonBodyParser, (req, res) => {
    //en el body no se envia el username, se envia en una cabecera llamada authorisation : Authorisation: Basic <credentials>
    //de esta manera usamos el identidicador de la persona que quiere crear el post

    const username = req.headers.authorization.slice(6) //a partir del caracter 6 de la cabecera
    const { title, image, description } = req.body


    try {//recibimos dos parametros que son los que devuelve la funcion getPosts en logic
        logic.createPost(username, title, image, description, (error) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }
            res.status(201).send() //automaticamente enviara estado 200
        })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }

})

// eliminamos un post
api.delete("/posts/:postId", (req, res) => {
    //cuando queremos especificar que post queremos eliminar, lo especificamos por la url. Recogemos el dato medianto params

    const username = req.headers.authorization.slice(6) //a partir del caracter 6 de la cabecera

    const { postId } = req.params

    try {
        logic.deletePost(username, postId, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }
            res.status(204).send() //cuando no hay nada que responder, todo Ok pero no hay contenido de respuesta
        })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.listen(8080, () => console.log("api is up http://localhost:8080"))