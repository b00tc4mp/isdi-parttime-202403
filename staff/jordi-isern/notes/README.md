# My Notes

## BASH comands

### PWD
te muestra en que carpeta estas
```sh
$ pwd
/user/my-folder
```
### cd

cambia de directorio
```sh
$ cd my-folder
```
### ls

Muestrra el listado de archivos en la carpeta
```sh
$ ls
-README.md	 -staff
```
### ls -l 

Listado de archivos en la carpeta con infomación extra como los permisos entre otros.
```sh
$ ls -l
total 8
-rw-r--r--  1 jordiisern  staff  22 20 mar 21:26 README.md
drwxr-xr-x  3 jordiisern  staff  96 20 mar 21:38 staff
```

### mkdir

genera un nueva carpeta.
```sh
$ mkdir //nombre de la carpeta
```
### cd
Sirve para entrar a una carpeta, puedes poenr el nombre de la carpeta que quieres acceder si estar en su carpeta superior o poner la ruta completa.

```sh
$ ls //para ver que carpetas contiene la ruta.
README.md	staff
$ isdi-parttime-202403 % cd staff
$ pwd // para ver que estamos dentro de la carpeta staff
/Users/jordiisern/Documents/programación/Boot camp full stack/workspace/isdi-parttime-202403/staff
```
### shortcurt  cmd+K en mac ctr+K en windows
 con este shortcut podemos limpiar la terminal y volverá a estar vacia, eso no quiere decir que hayamos cambiado de directorio, si estabamos en la carpeta staff despues de cmd+k/ctl+k seguiremos en la capeta staff

 Tambiebn puedes escribir clear en la terminal, obtienes el mismo resultado.
   
---
<br>

## git commands

### status
te da información del estado del git, por ejemplo si las carpetas estan sincronizadas o no.
```sg
$git status
En la rama feature/notes
Archivos sin seguimiento:
  (usa "git add <archivo>..." para incluirlo a lo que será confirmado)
        staff/jordi-isern/notes/

no hay nada agregado al commit pero hay archivos sin seguimiento presentes (usa "git add" para hacerles seguimiento)
````

### branch
puede ver en que rama del git estas.
```sh 
$git branch 
  develop
* feature/notes
  main
  ````

### branch + neva rama
generas una nueva rama, pero no estarás dentro de ella.
```sh
git branch [nueva rama]
```
### switch
te permite cambiar de rama
```sh
git switch [nombre de la rama]
```
### clone
puedes clonar un repositorio de git
```sh
git clone [link del repositorio]
```
### add
es el primer paso para poder realizar un cambio en el git, le estas añadiendo el cambio.
```sh
git add [directorio de la carpeta a subir]
```

### commit -m 
Confirmas que el cambio que has anunciado con el git add.

```sh
git commit-m "[descripción del commit]"
```
### push 
empujas el cambio al git, has añadido el cambio al repositorio. Ahora puedes acceder a tu fichero acctualizado desde git.

```sh
git push
```
### log
puedes acceder al historial del git

```sh
git log
```

Si necesitas mas información sobre los git comands en este [link](ttps://training.github.com/downloads/es_ES/github-git-cheat-sheet/) puedes cer mas información de los comans mas utilizados.




