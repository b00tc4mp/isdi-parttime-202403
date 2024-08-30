//herramienta de node para leer archivos
const fs = require("fs")

const filesMiddleware = (req, res) => {
    const path = req.params[0]
    const route = `./public/${path}`

    // comprobamos si es fichero o directorio
    fs.stat(route, (error, stats) => {
        if (error) {
            res.status(404).send(error.message)

            return
        }

        //verificamos si la extension del archivo es texto o html
        if (stats.isFile()) {
            if (path.endsWith(".txt") || path.endsWith(".html") || path.endsWith(".css")) {

                fs.readFile(route, "utf8", (error, content) => {
                    if (error) {
                        res.status(404).send(error.message)

                        return
                    }
                    res.send(content)
                })
                //si no lo es, que lea los siguientes archivos. Le mandamos el content-type de cada uno
                //no aladimos utf8 por que daria error, le pasamos todo el chunk de bits y añadimos setHeader
            } else {
                fs.readFile(route, (error, content) => {
                    if (error) {
                        res.status(404).send(error.message)

                        return
                    }

                    if (path.endsWith(".ico"))
                        res.setHeader("Content-Type", "image/vnd.microsoft.icon")
                    else if (path.endsWith(".png"))
                        res.setHeader("Content-Type", "image/png")
                    else if (path.endsWith(".jpg"))
                        res.setHeader("Content-Type", "image/jpeg")

                    res.send(content)
                })

            }
        } else if (stats.isDirectory()) {
            //lista los ficheros que hay en una carpeta 
            fs.readdir(route, (error, files) => {

                if (error) {
                    res.status(404).send(error.message)

                    return
                }

                const html =
                    `<ul>
                         ${files.map(file =>
                        `<li>
                        <a href="${path}/${file}">${file}</a>
                         </li>`).join("\n")}
                     </ul>`

                res.send(html)
            })
        }
    })
}

module.exports = filesMiddleware