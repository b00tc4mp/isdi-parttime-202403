const express = require('express')

const server = express()

server.get('/hello', (req, res) => {

})

const data = [
    {name : 'Peter Pan', age: 20},
    {name : 'Wendy Darling', age: 21},
    {name : 'Ada love', age: 22},
]

//http://localhost8080/search?q=Peter
server.get('/search', (req, res) =>{
    //const q = req.query.q

    const { q } =req.query

    const filtered = data.filter(pèrson => personalbar.name.includes(q))

    res.json(filtered)
})


server.listen(8080, () => console.log('server up'))