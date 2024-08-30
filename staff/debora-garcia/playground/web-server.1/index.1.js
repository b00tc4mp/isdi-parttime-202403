const express = require("express")
// require permite requerir una libreria.Es una funcion globalmente definida dentro de node para poder pedir al manejador de paquetes (node_modules) que traiga el modulo exptress, te trae el software dfinido dentro de express
//lo que exporta en el indice dentro de express lo importamos nosotros asi.

// dependemos de express, una herramienta para crear un servidor

//creamos un nuevo servidor como google, que será una funcion que devuelve un objeto que tiene metodos para configurar dicho servidor
// como configurar rutas y metodos HTP

const server = express()

// un metodo es el get configuramos una ruta, se pasa un callback con dos argumentos
// middleware controler o handler, que atiende de manera asincrona tu peticion y darte respuesta
// request y response
server.get("/hello", (req, res) => {
    //creamos una ruta virtual
    res.send("hello world")

})
//creamos un puerto para desarollo con chivato para saber si ha arrancado.
//de esta manera las peticiones se escucharan en dicho puerto
//lo que se envia al servidor, express recoje la peticion en el objecto llamado request,
// y el objecto response responde al cliente que demanda algo al servidor

server.listen(8080, () => console.log("server up"))