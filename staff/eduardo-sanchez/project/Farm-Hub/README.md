## App Installation

# React + Vite

```bash
$ npm create vite@latest
```
Sigue las instrucciones en pantalla para nombrar tu proyecto y seleccionar "React" como plantilla.

Navega a la carpeta del proyecto y ejecuta:
        ```sh
       npm install
        ```
Inicia el servidor de desarrollo con:
        ```sh
    $ npm run dev
    ```
# node_modules

```sh
$ npm i
```
# com:

Entra en la carpeta com y ejecuta:

```sh
$ npm init --yes
```
Esto generará un archivo package.json con el contenido básico. A continuación, edita package.json para que se maneje con módulos de ECMAScript agregando "type": "module" 

Instala el paquete com tanto en API como en APP.

```sh
$ npm install ../com
```
# ReactDOM

```sh
$ npm install react react-dom
```

# React Router Dom 
```sh
$ npm install react-router-dom
```
# Tailwindcss con React/Vite:

```sh
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```
Esto creará un archivo `tailwind.config.js` y un archivo `postcss.config.js` en tu proyecto.

Abre el archivo `tailwind.config.js` y configura las rutas de tus archivos fuente:
```
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}', 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
`postcss.config.js` debe haber sido creado por `npm tailwindcss init -p` y debe contener:

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

## App Execution

```sh
$ npm start
```
or 

```sh
$ npm run dev
```

