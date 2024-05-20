// Importamos los módulos necesarios
const express = require('express');
const fs = require("fs");
const utils = require('./utils');

// Inicializamos la aplicación Express
const server = express();

// Ruta para devolver un mensaje en formato aleatorio
// <http://localhost:8080/hello>
server.get("/hello", (req, res) => {
  // Enviamos un mensaje con caracteres aleatorios
  res.status(200).send(utils.toRandomCase("Hello World!"));
});

// Ruta para saludar a una persona específica
// <http://localhost:8080/hello/pepito> (nombre de la persona que quieras)
server.get("/hello/:to", (req, res) => {
  // Obtenemos el parámetro de la ruta
  const { to } = req.params;
  // Enviamos un mensaje con vocales convertidas a números
  res.status(201).send(utils.vowelsToNumbers(`Hello ${to}!`));
});

// Datos de ejemplo para la búsqueda
const data = [
  { name: "Peter Pan", age: 20 },
  { name: "Wendy Darling", age: 30 },
  { name: "Jack", age: 30 }
];

// Ruta para buscar en los datos
// <http://localhost:8080/search?q=Peter>
server.get("/search", (req, res) => {
  // Obtenemos el parámetro de consulta 'q'
  const { q } = req.query;
  // Filtramos los datos que contienen el valor de 'q' en el nombre
  const filtered = data.filter(user => user.name.includes(q));
  // Enviamos los resultados como JSON
  res.json(filtered); // res.send(filtered) también funcionaría
});

// Ruta para manejar todas las otras rutas y servir archivos
server.get("/*", (req, res) => {
  // Obtenemos la ruta solicitada
  const path = req.params[0];
  const route = `./public/${path}`;

  // Verificamos si la ruta es un archivo o un directorio
  fs.stat(route, (error, stats) => {
    if (error) {
      // Si hay un error, enviamos un mensaje de error 404
      res.status(404).send(error.message);
      return;
    }

    if (stats.isFile()) {
      // Si es un archivo, leemos y enviamos su contenido
      fs.readFile(route,"utf8", (error, content) => {
        if (error) {
          res.status(404).send(error.message);
          return;
        }
        res.send(content);
      });
    } else if (stats.isDirectory()) {
      // Si es un directorio, leemos y listamos los archivos
      fs.readdir(route, (error, files) => {
        if (error) {
          res.status(404).send(error.message);
          return;
        }
        // Generamos un HTML con enlaces a los archivos
        const html = `<ul>
        <img href="/Users/johnnyrojascifra/workspace/isdi-parttime-202403/staff/johnny-rojas/playground/web-server/public/colors/Flag_of_Germany.svg.png>
          ${files.map(file => `<li>
            <a href="${path}/${file}">${file}</a>
          </li>`).join("\n")}
        </ul>`;
        res.send(html);
      });
    }
  });
});

// Iniciamos el servidor en el puerto 8080
server.listen(8080, () => console.log("server running on port 8080"));

