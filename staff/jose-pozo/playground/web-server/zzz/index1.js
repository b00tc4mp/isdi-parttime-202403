const express = require('express')
const utils = require('./utils')

const server = express()

const fs = require('fs')

server.get('/hello', (req, res) => {
    res.send(utils.toRandomCase('Hello World!'))
})

server.get('/hello/:to', (req, res) => {
    const { to } = req.params

    res.send(utils.vowelsToNumbers(`Hello ${to}!`))
})

server.get('/*', (req, res) => {
    const path = req.params[0]
    const route = `./public/${path}`

    fs.stat(route, (error, stats) => {
        if (error) {
            res.status(404).send(error.message)

            return
        }

        if (stats.isFile())
            fs.readFile(route, (error, content) => {
                if (error) {
                    res.status(404).send(error.message)

                    return
                }
                // res.contentType('image/png')
                res.send(content)
            })

        else if (stats.isDirectory())
            fs.readdir(route, (error, files) => {
                if (error) {
                    res.status(404).send(error.message)

                    return
                }

                const html = `<ul>
                    ${files.map(file => `<li>
                    <a href='${path}/${file}'>${file}</a>`)}
                    </li>)
                    </ul>`

                res.send(html)
            })
    })
})

server.listen(8080, () => console.log('Server running on port 8080'))