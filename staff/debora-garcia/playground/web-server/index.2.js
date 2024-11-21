const express = require("express")

//herramienta de node para leer archivos
const fs = require("fs")

const server = express()

//leemos un directorio
server.get("/*", (req, res) => {
    const path = req.params[0]
    const route = `./public/${path}`
    // comprobamos si es fichero o directorio
    fs.stat(route, (error, stats) => {

        if (error) {
            res.status(404).send(error.message)

            return
        }

        if (stats.isFile()) {
            fs.readFile(route, "utf8", (error, content) => {
                if (error) {
                    res.status(404).send(error.message)

                    return
                }
                res.send(content)
            })
        } else if (stats.isDirectory()) {
            //lista los ficheros que hay en una carpeta 
            fs.readdir(route, (error, files) => {

                if (error) {
                    res.status(404).send(error.message)

                    return
                }
                res.send(files)
            })
        }
    })
})

server.listen(8080, () => console.log("server up"))


