/* La línea `const fs = require('fs')` en el fragmento de código JavaScript está importando el Node.js integrado
módulo 'fs', que significa Sistema de archivos. Este módulo proporciona funciones para interactuar con el
sistema de archivos en un entorno Node.js. Al requerir 'fs', el código obtiene acceso a métodos como
leer archivos, escribir archivos, verificar estadísticas de archivos y más, que son esenciales para las operaciones de archivos
dentro de la aplicación. */
const fs = require('fs')

/**
 * La función `filesMiddleware` sirve archivos o directorios según la ruta solicitada y maneja
 * diferentes tipos de contenido en consecuencia.
 * @param req: el parámetro `req` en la función `filesMiddleware` representa el objeto de solicitud. Él
 * contiene información sobre la solicitud HTTP realizada por el cliente, como la URL de solicitud, solicitud
 * método, encabezados de solicitud, parámetros de solicitud y más. En este contexto, `req.params[0]` es
 * @param res - El parámetro `res` en la función `filesMiddleware` es el objeto de respuesta que
 * representa la respuesta HTTP que envía una aplicación Express cuando recibe una solicitud HTTP. Esta usado
 * para enviar datos al cliente que realiza la solicitud, como enviar un código de estado, configurar encabezados,
 * y enviando el
 */
const filesMiddleware = (req, res) => {
    const path = req.params[0]
    const route = `./public/${path}`

/* La función `fs.stat(route, (error, stats) => { ... }` en el fragmento de código se utiliza para recuperar
información sobre el archivo o directorio especificado por la ruta `ruta`. El método `fs.stat`
recupera de forma asincrónica las estadísticas del objeto del sistema de archivos. */
    fs.stat(route, (error, stats) => {
        if (error) {
            res.status(404).send(error.message)

            return
        }

/* Esta parte del código comprueba si la ruta solicitada corresponde a un archivo (a diferencia de
un directorio). Si es un archivo, verifica además si la extensión del archivo es '.txt', '.html' o '.css'. Si la extensión del archivo coincide con uno de estos tipos, lee el archivo
de forma asincrónica usando `fs.readFile` con la codificación establecida en 'utf8'. Al leer el archivo,
establece el encabezado del tipo de contenido apropiado según la extensión del archivo y envía el archivo
contenido en la respuesta. */
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
/* El fragmento de código `fs.readFile(route, (error, content) => {... }` está leyendo el contenido de un archivo
asincrónicamente. Si ocurre un error durante el proceso de lectura, establece el estado de respuesta en 404
y envía el mensaje de error como respuesta. Esta parte del código es responsable de leer el
contenido del archivo y manejar cualquier error potencial que pueda ocurrir durante la operación de lectura. */
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
/* El fragmento de código `} else if (stats.isDirectory()) fs.readdir(route, (error, files) => {` está comprobando
si la ruta solicitada corresponde a un directorio. Si la ruta es realmente un directorio, entonces usa
`fs.readdir` para leer el contenido de ese directorio de forma asincrónica. El método `fs.readdir` lee
el contenido de un directorio y devuelve una matriz de todos los nombres de archivos en ese directorio. */
        } else if (stats.isDirectory())
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
}

module.exports = filesMiddleware