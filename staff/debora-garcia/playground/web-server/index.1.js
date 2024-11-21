const express = require("express")

//herramienta de node para leer archivos
const fs = require("fs")

const server = express()

//obtenemos lo que escribimos en la ruta

/* server.get("/*", (req, res) => {
    const path = req.params[0]
    res.send(path)
    
}) */

// busca un archivo y devuelve el contenido
//ponemos la carpeta d origen buscando x archivo en la carpeta.
server.get("/*", (req, res) => {
    const path = req.params[0]
    //responde con un error si va mal, d lo contrario te devuelve con el contenido.
    //hace un throw error (contiene la propiedad message)
    //utf8 es un formato del sistema operativo que convierte bites a string

    fs.readFile(`./public/${path}`, "utf8", (error, content) => {
        if (error) {
            res.status(404).send(error.message)

            return
        }
        res.send(content)

    })

})

server.listen(8080, () => console.log("server up"))


