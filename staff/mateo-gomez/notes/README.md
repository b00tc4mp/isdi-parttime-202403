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
