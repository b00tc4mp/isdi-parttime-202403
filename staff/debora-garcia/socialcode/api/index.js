// const express = require("express")
//import express, { json } from "express"
import express from "express"
import fs from "fs"
const api = express()

// express ya tiene montado el jsonBodyParser

const jsonBodyParser = express.json()

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


//creamos nuevo usuario

api.post("/users", jsonBodyParser, (req, res) => {
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