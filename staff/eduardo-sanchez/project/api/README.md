## API Installation

# Express

```sh
$ npm install express
```
# node_modules

```sh
$ npm i
```
# cors

```sh
$ npm install cors
```
# jsonwebtoken

```sh
$ npm install jsonwebtoken
```
# bcryptjs

```sh
$ npm i bcrypt
```
# Mongoose

```sh
$ npm install mongoose
```
# com

```sh
$ npm install ../com
```
# dotenv
```sh
$ npm i dotenv
```

# Mocha & Chai

```sh
$ npm install --save-dev mocha chai
```
Configuración de scripts en package.json
Después de instalar Mocha y Chai, es útil añadir un script en tu package.json para ejecutar las pruebas de manera más conveniente. Abre tu package.json y añade el siguiente script:
"scripts": {
    "start": "node --watch .",
    "inspect": "node --inspect-brk .",
    "test": "mocha logic/*.spec.js",
    "test-inpsect": "mocha --inspect-brk logic/*.spec.js"
  },
​
Esto te permite ejecutar las pruebas simplemente con el comando:
```
$ npm test 
```

## Api Execution

```sh
$ npm start
```
or 

```sh
$ npm run watch
```