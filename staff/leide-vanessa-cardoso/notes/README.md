# My Notes

## BASH commands

### pwd - path to working directory

```sh
$ pwd
/users/my-user
```
### cd - change directory

```sh 
$ cd my-folder
```

### ls -list (files and folders)

```sh
$ ls
file-a 
file-b
file-c
```

## Git commands

### clone - copies an existing Git repository

### switch  - cheange files

### status

```sh
$ git status
On branch feature/notes
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        staff/leide-vanessa-cardoso/notes/

nothing added to commit but untracked files present
 (use "git add" to track)
 ```

 ### branch

 ```sh
 $ git branch
   develop
* feature/notes
  main
  ```
  ### log - check to commit

  ```sh
  $ git log
  commit f46cac17c6344070f4577df852d8db1d33769a55 (HEAD -> feature/notes, origin/feature/notes)
Author: LeideVanessaC <lei.vanessacardoso@gmail.com>
Date:   Tue Mar 26 17:34:28 2024 +0100

    add my notes #1

commit cf34570a48ffa931c4b7ce5d061a6619ff66440b (origin/develop, develop)
Author: LeideVanessaC <lei.vanessacardoso@gmail.com>
Date:   Thu Mar 21 21:05:05 2024 +0100

    delete old files #19

commit 6e4cd14a6870e39686b9b3f1d57daa5f4b59d2c4
Author: LeideVanessaC <lei.vanessacardoso@gmail.com>
Date:   Thu Mar 21 20:44:41 2024 +0100

    add my folder with git wrote #19

commit 3e669dcb19338624049e5334a39bafd1f1436fde
Author: LeideVanessaC <lei.vanessacardoso@gmail.com>
Date:   Thu Mar 21 14:14:41 2024 +0100
:
```


  ### add - add to commit

  ### commit -m  

  ```sh
  $ git commit -m "add my notes #1"
[feature/notes f46cac1] add my notes #1
 1 file changed, 61 insertions(+)
 create mode 100644 staff/leide-vanessa-cardoso/notes/README.md
 ```

 ### push
 ```sh
 $ git push
 fatal: The current branch feature/notes has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin feature/notes

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.
```

### push -u (It's a shortcut to replace "--set-upstream ")

```sh
$ git push -u origin feature/notes
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Delta compression using up to 20 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 805 bytes | 402.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote:
remote: Create a pull request for 'feature/notes' on GitHub by visiting:
remote:      https://github.com/LeideVanessaC/isdi-parttime-202403/pull/new/feature/notes
remote:
To https://github.com/LeideVanessaC/isdi-parttime-202403
 * [new branch]      feature/notes -> feature/notes
branch 'feature/notes' set up to track 'origin/feature/notes'.
```












