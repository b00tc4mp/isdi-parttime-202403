// const express = require("express")
//import express, { json } from "express"
import express from "express"
import fs from "fs"
import logic from "./logic/index.js"

const api = express()

// express ya tiene montado el jsonBodyParser

const jsonBodyParser = express.json({ strict: true, type: "application/json" })

api.get("/posts", (req, res) => {
    fs.readFile("./data/posts.json", "utf8", (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const posts = JSON.parse(json)
        res.json(posts)
    })
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
            //200 ya que no estanos construiendo nada
            res.status(200).send()
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
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

        post.id = `${Math.random().toString().slice(2)}-${Date.now()}`
        post.date = new Date().toISOString()

        posts.push(post)

        const newJson = JSON.stringify(posts)

        fs.writeFile("./data/posts.json", newJson, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    })

})


api.listen(8080, () => console.log("api is up"))