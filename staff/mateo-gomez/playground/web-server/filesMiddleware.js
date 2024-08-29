const fs = require('fs')


const filesMiddleware = (req, res) => {
    const path = req.params[0]
    const route = `./public/${path}`

    fs.stat(route, (error, stats) => {

        if (error) {
            res.status(404).send(error.message)

            return
        }

        if (stats.isFile()) {
            if (path.endsWith('.txt') || path.endsWith('.html') || path.endsWith('.css'))
                fs.readFile(route, 'utf8', (error, content) => {
                    if (error) {
                        res.status(404).send(error.message)

                        return
                    }


                    if (path.endsWith('.txt'))
                        res.setHeader('Content-Type', 'text/plain')
                    else if (path.endsWith('.html'))
                        res.setHeader('Content-Type', 'text/html')
                    else if (path.endsWith('.css'))
                        res.setHeader('Content-Type', 'text/css')

                    res.send(content)
                })
            else
                fs.readFile(route, (error, content) => {
                    if (error) {
                        res.status(404).send(error.message)

                        return
                    }
                    if (path.endsWith('.ico'))
                        res.setHeader('Content-Type', 'image/vnd.microsoft.icon')
                    else if (path.endsWith('.png'))
                        res.setHeader('Content-Type', 'image/png')
                    else if (path.endsWith('.jpg'))
                        res.setHeader('Content-Type', 'image/jpeg')

                    res.send(content)
                })
        } else if (stats.isDirectory())
            fs.readdir(route, (error, files) => {
                if (error) {
                    res.status(404).send(error.message)

                    return
                }
                const html = `<ul>
                ${files.map(file => `<li>
                <a href = "${path}/${file}">${file} </a>
                </li>`).join('')}
                </ul>`

                res.send(html)
            })
    })


}

module.exports = filesMiddleware