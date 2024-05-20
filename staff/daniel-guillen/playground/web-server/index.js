const express = require('express')

const server = express()

server.get('/hello', (req, res) => {
    res.send('hello world')

})

server.listen(8080, () => console.log('server up'))