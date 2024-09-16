# My notes

# COMIENZO DE UN PROYECTO COLABORATIVO PARTIENDO DE OTRA CUENTA DE GITHUB

- Lo primero sería forkear el repositorio a nuestra cuenta **desde github**.

- Una vez en la carpeta de vsc donde queramos clonar el repo en la terminal(**fuera de VSC**) escribiremos `git clone url del repo https://github.com/magicjorge1980/xxxxx`

- como nos encontramos en la rama main, crearemos una nueva rama con `git branch nombre de rama`(ej. `git branch develop`)

- para seleccionar la nueva rama creada y trabajar sobre ella lo haremos con `git switch nombre de rama
`
- Con `touch ruta archivo/.gitignore` crearemos el archivo vacío(en este archivo podemos poner los archivos que queremos que git ignore dentro de la carpeta y no los suba) por ejemplo:

  - **.DS_Store**
  - **thumbs.db**

- Ahora con `git add ruta de archivo/nombre de archivo` añadiremos el nuevo archivo al repo

- con `git status`podemos ver el estado del proceso

- con `git commit -m “texto para identificar el cambio”` terminaremos el proceso

- con `git log` podremos ver el log de todos los commits

---

## HACER PULL REQUEST

- Una vez ya tenemos los cambios en VSC y añadidos en nuestro Branch develop, para hacer pullrequest en el repo original(rama develop) haremos lo siguiente:

  - En el nuestro repo forkeado pulsamos sobre **PULL REQUEST / NEW PULL REQUEST**
  - Elegiremos la rama desde donde enviamos a la que enviamos ej. develop-develop
  - Le pondremos un título y crearemos la nueva pullrequest

## MODIFICAR ÚLTIMO COMMIT

Si nos hemos equivocado a la hora de subir el último commit podemos reemplazarlo de la siguiente manera:

- Si hemos cargado el siguiente commit con un texto erróneo `git commit -m "xxxxxxxxx yy""` podemos reemplazarlo de la siguiente manera `git commit --amend -m "xxxxxxxxx zz"`.

- Para cargar este commit editado debemos forzarlo de la siguiente manera `git push -f`

Si lo que deseamos es añadir o modificar archivos del último commit podemos hacerlo de la siguietne manera:

`git add archivo.js`

`git commit --amend --no-edit`

`git push -f`

[📚documentacion de git 📚](https://training.github.com/downloads/es_ES/github-git-cheat-sheet/)
