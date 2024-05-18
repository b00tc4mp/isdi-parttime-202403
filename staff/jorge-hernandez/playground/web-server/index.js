const express = require('express')
const fs = require('fs')

const server = express()

server.get('/*', (req, res) => {
    const path = req.params[0]
    const route = `./public/${path}`


    fs.stat(route, (error, stats) => {
        if (error) {
            res.status(404).send(error.message)

            return
        }

        if (stats.isFile()) {
            fs.readFile(route, 'utf-8', (error, content) => {
                if (error) {
                    res.status(404).send(error.message)

                    return
                }

                res.send(content)

            })
        }

        else if (stats.isDirectory()) {
            fs.readdir(route, (error, files) => {
                if (error) {
                    res.status(404).send(error.message)

                    return
                }

                const html = `<ul>
                ${files.map(file => `<li>
                <a href= "${path}/${file}">${file}</a>
                </li>`).join('')}
                </ul>`

                res.send(html)
            })
        }

    })
})
server.listen(8080, () => console.log('server up'))
