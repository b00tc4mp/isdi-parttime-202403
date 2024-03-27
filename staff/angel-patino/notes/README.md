# My Notes


## BASH commands

### pwd - path to working directory

````sh
$ pwd
/users/my-user
`````

### cd - change directory

````sh
$ cd my-folder
`````


###ls - list (files and folders)

````sh
$ ls
file-a file-b file-c
`````




## Git commands

### Status

```sh
$ git status
On branch feature/notes
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        staff/angel-patino/notes/

nothing added to commit but untracked files present (use "git add" to track)
`````

### Ver ramas *(branch)*

````sh
$ git branch 
  develop
* feature/notes
  main
  `````


#### Crea rama 
````sh
$ git branch < nombre de la rama >
`````

#### Delete branch
````sh
$ git branch -d < nombre de la rama >
`````

### Cambiar rama
````sh
$ git checkout < nombre de la rama >
$ git switch < nombre de la rama >
`````
### Ver historial de commit
````sh
$ git log
commit 0ae116b7444bdeed6ebd5bb091bab677687cd68e (HEAD -> feature/notes, origin/feature/notes)
Author: Pat <thegelu@gmail.com>
Date:   Tue Mar 26 10:40:09 2024 +0100

     add my notes #15

commit 7d9234f8370391bf0165f91a9f0b364424405200
Author: Pat <thegelu@gmail.com>
Date:   Mon Mar 25 20:10:22 2024 +0100

````

#### Como actualizar la carpeta que estás trabajando
````sh
1. $ git add < ruta >
2. $ git status *para ver que está todo OK*
3  $ git commit -m "comentario #nº" *añade la terminación WIP al final del comentario para indicar que sigues trabajando en ella*
  3.1  $ git commit --amend -m "comentario #nº" *para corregir un commit equivocado*
4. git push
  4.1  $ git push -f *para forzar la actualización de datos*
````

````sh
### Verificar cambios
$ git fetch
`````

### Borrar último commit
´´´´sh
$ git reset < nº de commit >
`````

````sh
### Renombrar
$ git mv < ruta origen > < ruta destino- nombre nuevo >
````