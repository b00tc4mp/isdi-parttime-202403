const express = require('express')
const fs = require('fs')

const server = express()

server.get('/*', (req, res) => {
    const path = req.params[0]

    fs.readFile(`./public/${path}`, 'utf8', (error, content) => {
        if (error) {
            res.status(500).send(error.message)

            return
        }

        res.send(content)

        // const route = `./public/${path}`
        //res.send(path)

    })
})

server.listen(8080, () => console.log('server up'));