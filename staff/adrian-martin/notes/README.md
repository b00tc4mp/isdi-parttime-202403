# Uso de la terminal y sus comandos 
### Comandos de navegacion y visualizacion

    ·pwd: donde se ubica el archivo abierto

    ·ls: carpetas de usuario

    ·ls-l: fechas, permisos de las carpetas

        ·drwx
            d: directory
            r: read
            w: write
            x: execute

    ·ls-a: archivos ocultos (carpeta de usuario)

    ·cd "x": cambiar de directorio

    ·cd.. : retrocede un paso del directorio

    ·cd~ : cambia al directorio de inicio del usuario

###Comandos de Manipulacion de Archivos y Directorio 

    ·mkdir: crear carpeta

    ·mkdir -p "staff/adrian-martin":crear 2 carpetas de trabajo

    ·cp "archivo origen" "archivo destino": copia un archivo o directorio

    ·touch "staff/adrian-martin/.gitignore": crear fichero vacio ( ejemplo de fichero oculto para ocultar archivos a git)

    ·cat "staff/adrian-martin/.gitignore": ver contenido

    ·mv "archivo origen" "archivo destino: mueve archivo o directorio

    ·rm "archivo" : elimina un archivo

    ·rm -r "directorio": elimina un directorio y su contenido

### Otros comandos

    ·Ctrl + N : limpiar la terminal

    ·history: muestra historial de comandos usados

    ·man [comando]: Muestra el manual de un comando específico.

# Comandos de Git

    ·git init: inicia un repositorio en el directorio actual

    ·git add "staff/adrian-martin/.gitignore": introduce la copia en git

    ·git commit -m "comentario de que se esta haceindo ": guardar

    ·git push: sube los commits locales al origin

    ·git pull: descarga los cambios desde el repositorio remoto y losfusiona con tu rama local

    ·git fetch: descarga los cambios desde el repositorio remoto, pero no los fusiona automáticamente con tu rama local.

    ·git log: ves los commit(cambios)

    ·git clone(url): copiar en la carpeta asignada

    ·git branch: ver ramas de trabajo(main/develop...)

    ·git branch "develop": crea rama de trabajo(expl:develop)

    ·git switch "develop": cambia de rama(expl:en este caso a develop creada anteriormente)

    ·git checkout: se mete dentro de la rama creada

    ·git status: informacion de la carpeta respecto a git

    ·git rebase: combina trabajo, conjunto de commits, los copia y aplica a otro lafo

    ·git mv: mover un archivo

    ·git diff: sirve para ver cambios y comparar

    ·git merge "nombre de la rama":fusiona la rama especificada con la rama actual

    ·git reset "hash": reset el comit al commit que se indica

# Ejemplos de uso

### Cambiar fichero (gitignore) y subir a git

    1. hacer las modificaciones

    2. git status  (para comprobar) 

    3. git add "staff/adrian-martin/.gitignore"

    4. git status  (para comprobar)

    5. git commit -m "edit St_Storage #7"

    6. git log  (para ver si el commit se ha guardado)

    7. git push

### Cambiar nombre carpeta y subir cambios

    1. renombrar carpeta

    2. git add

    3. git status  (para comprobar)

    4. git commit -m "edit the name"

    5. git log para ver si el commit se ha guardado

    6. git push

### Quitar ultimo commit

    1. git log

    2. copiar codigo del commit que queremos cambiar (origin)
    
    3. git reset y pegamos el codigo

    4. limpar

    5. git status
