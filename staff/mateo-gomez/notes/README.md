# My Notes

## Bash commands

### pwd - path to working directory 
```sh
"Para saber en qué directorio o en qué carpeta se encuentra actualmente"

$ pwd
/c/Users/Usuario/workspace/isdi-parttime-202403
```

### cd - change directory
```sh
"Para movernos entre carpetas"

$ cd workspace/
```

### cd .. - change directory to previous directory in the hierararchy

```sh
"Para salir del directorio y devolverme uno más atrás en la jerarquía"

$ cd ..
```


### git log -  Show commit logs

```sh
"Para ver el historial de commits"
```



### ls - list (files and folders)

```sh
"Permite listar todos los archivos y carpetas que se encuentren dentro de un determinado directorio (en el directorio que se encuentra)"

$ ls
README.md  staff/
```

### ls -a - list (files and folders even those that are hidden)

```sh
"Listado de todos los archivos y directorios incluidos los que se encuentran ocultos"

$ ls -a 
./  ../  .git/  README.md  staff/

```


### ls -l - list (files and folders with more information)

```sh
"Abre más información sobre las carpetas"

$ ls -l
total 1
-rw-r--r-- 1 Usuario 197121 22 Mar 20 20:45 README.md
drwxr-xr-x 1 Usuario 197121  0 Mar 25 19:37 staff/
```



### git status 

```sh
"Para saber el estado de nuestro repositorio"

$ git status
On branch feature/playground
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   staff/mateo-gomez/notes/README.md
```


### mkadir - create folder 

```sh
"Para crear una carpeta o repositorio nuevo"

$ mkdir (name of new folder)
```


### git init - Create an empty Git repository or reinitialize an existing one

```sh
"Para inicializar un repositorio en git dentro del (pwd) en el que se encuentre"

(Ejemplo de uso):
$ cd /path/to/my/codebase
$ git init      (1)
$ git add .     (2)
$ git commit    (3)

(1) Create a /path/to/my/codebase/.git directory.

(2) Add all existing files to the index.

(3) Record the pristine state as the first commit in the history.
```


### git clone - clone a repository into a new directory

```sh
"Para clonar una carpeta desde un repositorio. Por ejemplo para clonar una carpeta desde GitHub"

$ git clone --referencia /git/linux.git \
	git://git.kernel.org/pub/scm/.../linux.git\
	mi-linux
$ cd mi-linux
```

### git branch - List, create, or delete branches

```sh
"Para ver un listado de las ramas existentes y en cual se encuentra (*)"

$ git branch
  develop
* feature/notes
  feature/playground
  main
```


### git branch (name branch) - Create a new branch

```sh 
"Para crear una nueva rama"

$ git branch develop
```


### git switch - Switch branches

```sh
"Para cambiar a una rama (branch) específica"

$ git switch new-topic
Branch 'new-topic' set up to track remote branch 'new-topic' from 'origin'
Switched to a new branch 'new-topic'
```


### git commit -m " " - Record changes to the repository

```sh
"Para crear una nueva conformación que contenga el contenido actual del índice y el mensaje de registro proporcionado que describe los cambios"

$ edit hello.c
$ git rm goodbye.c
$ git add hello.c
$ git commit
```


### git add - Add file contents to the index

```sh
"Este comando actualiza el índice utilizando el contenido actual que se encuentra en el árbol de trabajo, para preparar el contenido preparado para la próxima confirmación"

$ git add Documentation/\*.txt
```


### git rm - Remove files from the working tree and from the index

```sh
"Elimine los archivos que coincidan con la especificación de ruta del índice o del árbol de trabajo y el índice. git rmno eliminará un archivo solo de su directorio de trabajo. (No existe ninguna opción para eliminar un archivo solo del árbol de trabajo y aún así mantenerlo en el índice; úsela /bin/rm si desea hacerlo). Los archivos que se eliminan deben ser idénticos a la punta de la rama y no deben actualizarse. su contenido se puede organizar en el índice, aunque ese comportamiento predeterminado se puede anular con la -f opción."

git rm Documentation/\*.txt
Elimina todos *.txtlos archivos del índice que se encuentran en el Documentationdirectorio y cualquiera de sus subdirectorios.
```


### git diff - Show changes between commits, commit and working tree, etc

```sh 
"Muestra cambios entre el árbol de trabajo y el índice o un árbol, cambios entre el índice y un árbol, cambios entre dos árboles, cambios resultantes de una combinación, cambios entre dos objetos blob o cambios entre dos archivos en el disco"

$ git diff tema maestro     (1) 
$ git diff tema..maestro    (2) 
$ git diff tema...maestro   (3)

(1) Cambios entre los consejos del tema y las ramas maestras.

(2) Lo mismo que arriba.

(3) Cambios que ocurrieron en la rama maestra desde que se inició la rama temática.
```







## Actions commands
### Cómo renombrar una carpeta: 

```sh
1º git mv (+ ruta a carpeta ej: staff/Goteo-Mamez/) (+ nuevo nombre ej: staff/mateo-gomez)
2º git status     ---> (mostrará los cambios)
3º git add (carpeta nombre nuevo ej: staff/mateo-gomez)
4º git status     ---> (mostrará si los cambios se han implementado)
5º git commit --amend -m "(mensaje que queremos poner a la acción ej: change name) #(número de tarea)"
6º git push       ---> Para subir los cambios 
```




### Cómo realizar cambios en ficheros específicos: 

```sh
1º Realizamos los camnios en VS
2º git status   ----> nos informa de los cambios
3º git add (+ ruta completa ej: staff/mateo-gomez/notes/READ.md)
4º git status   ----> mostrará si los cambios están dentro del cajón (stage)
5º git commit -m "rename file #3"
6º git push
```



### Cómo borrar una rama (branch):

```sh
1º git branch -m (feature/playground) ---> Cambia de nombre la rama 
2º git branch ---> Comprobar ramas
3º git branch -D (Read.md) ---> Eliminar rama
4º git push  ---> Sube los cambios 
5º git push --set-upstream origin
```





## Console Commands: 

### console.dir()

```sh
"Es un método para inspeccionar objetos mostrando una lista interactva de sus propiedades. El resultado se representa con una lista jerárqiuica"

Sintaxis: 
      console.dir(object)

```


### document.querySelector()

```sh
"Devuelve el primer elemento dentro del documento que coincide con el selector o grupo de selectores especificado. Si no se muestran coincidencias = null."

Sintaxis: 
      querySelector(selectors)

Ejemplo: 
      const el = document.querySelector(".myclass");
```



### document.querySelector().innerText

```sh
También puedes hacer cambios de esta manera: 

document.querySelector(" "). innerText= " ";
  
    --> Ejemplo: 
        document.querySelector("title").innerText = "Cv-Pepito Grillo"
```
