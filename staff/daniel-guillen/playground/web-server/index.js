/* `const express = require('express')` está importando el marco Express al archivo JavaScript. Por
Al requerir el módulo 'express', el código obtiene acceso a todas las funcionalidades proporcionadas por
Express, que permite la creación de una aplicación Express para manejar solicitudes y respuestas HTTP. */
const express = require('express')
/* La línea `const filesMiddleware = require('./filesMiddleware')` está importando un middleware personalizado
función denominada `filesMiddleware` de un archivo llamado `filesMiddleware.js`. Esto permite al Express
servidor para utilizar la funcionalidad proporcionada por el middleware `filesMiddleware` al manejar archivos entrantes.
Solicitudes HTTP. Las funciones de middleware en Express pueden realizar tareas como registro, autenticación,
análisis de datos y más, lo que ayuda a procesar las solicitudes antes de que lleguen a los controladores de ruta. */
const filesMiddleware = require('./filesMiddleware')

/* `const server = express()` está creando una instancia de la aplicación Express. Esta línea inicializa
un nuevo servidor Express que manejará las solicitudes y respuestas HTTP entrantes. La variable `servidor` es
se utiliza para configurar rutas, middleware y otras configuraciones para la aplicación Express. */
const server = express()

/* La línea `server.get('/*', filesMiddleware)` en el fragmento de código está configurando una ruta en el
Servidor expreso. */
server.get('/*', filesMiddleware)

/* La llamada a la función `server.listen(8080, () => console.log('server up'))` está iniciando Express
servidor en el puerto 8080. Cuando el servidor se inicia correctamente, registrará el mensaje "servidor activo" en el
consola. Esta llamada a función es esencial para que el servidor comience a escuchar las solicitudes entrantes en
el puerto especificado. */
server.listen(8080, () => console.log('server up'))