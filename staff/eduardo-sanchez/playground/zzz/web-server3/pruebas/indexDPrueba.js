const express = require('express')

const server = express()

//http://localhost:8080/hello
server.get('/hello', (req, res) => {
    res.send('Hello, World!')
    //res.status(201).send('Hello, World');

});

//http://localhost:8080/hello/pepito
server.get('/hello/:to', (req, res) => {
    //const to = req.params.to
    const { to } = req.params

    res.send(`Hello, ${to}!`)
    //res.status(301).send(`Hello, ${to}!`);

});

const data = [
    { name: 'Peter Pan', age: 22 },
    { name: 'Wendy Dardoff', age: 30 },
    { name: 'Perico Palotes', age: 50 }
]

//http://localhost:8080/search?q=Peter
server.get('/search', (req, res) => {
    //const q = req.query.q
    const { q } = req.query

    const filtered = data.filter(person => person.name.includes(q))
    res.json(filtered)

})

server.listen(8080, () => console.log('server up'));

// el método includes es sensible a mayúsculas y minúsculas y te dara un array vacio si no encuentra la letra tal como se la has escrito. Para solucionar esto puedes normalizar tanto el valor de búsqueda como los nombres en el arreglo de datos a minúsculas antes de realizar la comparación.

/*

// Convertimos el valor de q a minúsculas
    const lowercaseQ = q.toLowerCase();

    const filtered = data.filter(person => person.name.toLowerCase().includes(lowercaseQ))
    res.json(filtered)

    */

//En esta versión, la línea const lowercaseQ = q.toLowerCase(); convierte el valor de la consulta q a minúsculas. Luego, en el filtro, person.name.toLowerCase().includes(lowercaseQ) convierte cada nombre a minúsculas antes de verificar si incluye lowercaseQ.

//Con esta modificación, la búsqueda será insensible a mayúsculas y minúsculas, y deberías obtener resultados al buscar términos en minúsculas, como q = p.