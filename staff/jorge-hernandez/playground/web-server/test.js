const express = require('express')
const fs = require('fs')
const path = require('path')

const server = express()

server.use(express.static(path.join(__dirname, 'public')))

server.get('/*', (req, res) => {
    const filePath = req.params[0]
    const fullPath = path.join(__dirname, 'public', filePath)
    fs.stat(fullPath, (error, stats) => {
        if (error) {
            res.status(404).send('File not found')
            return
        }

        if (stats.isFile()) {
            const ext = path.extname(fullPath).toLowerCase()
            let contentType = 'text/plain'

            switch (ext) {
                case '.html':
                    contentType = 'text/html'
                    break
                case '.js':
                    contentType = 'application/javascript'
                    break
                case '.css':
                    contentType = 'text/css'
                    break
                case '.json':
                    contentType = 'application/json'
                    break
                case '.png':
                    contentType = 'image/png'
                    break
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg'
                    break
                case '.gif':
                    contentType = 'image/gif'
                    break
                case '.svg':
                    contentType = 'image/svg+xml'
                    break
            }

            fs.readFile(fullPath, (error, content) => {
                if (error) {
                    res.status(500).send('Error reading file')
                    return
                }

                res.setHeader('Content-Type', contentType)
                res.send(content)
            })
        } else if (stats.isDirectory()) {
            fs.readdir(fullPath, (error, files) => {
                if (error) {
                    res.status(404).send(error.message)
                    return
                }

                const html = `<ul>
                    ${files
                        .map(
                            (file) =>
                                `<li><a href="${path.join(
                                    filePath,
                                    file
                                )}">${file}</a></li>`
                        )
                        .join('')}
                    </ul>`

                res.send(html)
                console.log(html)
            })
        } else {
            res.status(404).send('Not a file')
        }
    })
})

server.listen(8080, () => console.log('server up'))
