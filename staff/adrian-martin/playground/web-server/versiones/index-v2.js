const express = require('express')
const fs = require('fs')

// const utils = require('./utils')

const server = express()

server.get('/*', (req, res) => {
    const path = req.params[0]

    fs.readFile(`./public/${path}`, 'utf-8', (error, content) => {
        if(error){
            res.status(500).send(error.message)

            return
        }

        res.send(content)
    })
})

server.listen(8080, () => console.log('Server up'))
 