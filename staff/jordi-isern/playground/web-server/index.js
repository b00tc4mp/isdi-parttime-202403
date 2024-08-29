const express = require('express')
const fs = require('fs')
const path = require('path')

const server = express()

server.get('/*', (req, res) => {
    const path = req.params[0]
    const route = `./public/${path}`

    fs.stat(route, (error, stats) =>{
        if(error){
            res.status(404).send(error.message)
            
            return
        }
        if(stats.isFile()){
            fs.readFile(route, 'utf8', (error , content) => {

                //se tiene que hacer ocn static 
                if(error) {
                    res.status(404).send(error.message)

                    return
                }
                res.send(content)
            })

        } if (stats.isDirectory()){
            fs.readdir(route, (error, files) => {
                if(error){
                    res.status(404).send(error.message)

                    return
                }
                const html = `<ul>
                    ${files.map(file = `<li>
                        <a href = "${path}/${file}">${file}</a>
                        </li>`).join('')}
                </ul>`

                res.send(html)
            })
        }
    })

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