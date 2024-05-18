const express = require('express')

const fs = require('fs')
const utils = require('./utils')

const server = express()

server.get('/hello', (req, res) => {
    res.send('Hello World!')
})

server.get('/hello/:to', (req, res) => {
    const { to } = req.params

    res.send(`Hello, ${to}!`)
})

const data = [
    { name: 'Peter Pan', age: 20 },
    { name: 'John Doe', age: 30 },
    { name: 'Jane Doe', age: 40 }
]

server.get('/search', (req, res) => {
    const { q } = req.query

    const filtered = data.filter(user => user.name.includes(q))

    res.json(filtered)
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
            fs.readFile(route, 'utf8', (error, content) => {
                if (error) {
                    res.status(404).send(error.message)

                    return
                }

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
                        <a href="${path}/${file}">${file}</a>
                    </li>`).join('')}
                </ul>`

                res.send(html)
            })
    })
})

server.listen(8080, () => console.log('server up'))