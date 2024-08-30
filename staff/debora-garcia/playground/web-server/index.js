const express = require("express")
const filesMiddleware=require("./filesMiddleware")



const server = express()

// separamos el middleware en otro fichero
server.get("/*", filesMiddleware)

server.listen(8080, () => console.log("server up"))