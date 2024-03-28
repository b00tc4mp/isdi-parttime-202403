# My notes

## Bash commands

### pwd - path to working directory

```sh
$ pwd
/user/my-user
```

### cd change directory

```sh
$ cd my-folder
```

### ls - list (files and folders)

```sh
$ ls
file-a file-b file-c
```

## Git commands

### git status

```sh
- Current state of the repository

$ git status
On branch feature/notes
Your branch is up to date with 'origin/feature/notes'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   staff/carla-mateo/notes/README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

### git branch

```sh
- Lists all branches and shows the current branch

$ git branch
  develop
* feature/notes
  feature/playground
  main
  ```

### git log

``` sh
- Show commit history

commit 8aeb78804a4ff11055247c1f59c875d91f78e203 (HEAD -> feature/notes, origin/feature/notes)
Author: Carla Mateo <carlazoom@gmail.com>
Date:   Tue Mar 26 10:37:17 2024 +0100

     add new readme notes #14

commit d5f9b357eb61599894bf49a6d9a552628e0735b5 (origin/develop, develop)
Author: Carla Mateo <carlazoom@gmail.com>
Date:   Thu Mar 21 18:30:45 2024 +0100

    add my folder with git ignoring rules #14

commit 7a107ffe4be750d761c298d5e2a4de80fd9be162 (origin/main, origin/HEAD, main)
Author: manuelbarzi <manuelbarzi@gmail.com>
Date:   Tue Mar 19 19:18:09 2024 +0100
```

### git switch

```sh
- Change branche
```

### git add

```sh
- Add files

$ git add staff/carla-mateo/notes/README.md

```

### commit -m

```sh
- Create a new commit

$ git commit -m " add git commands #14 "
[feature/notes cd49117]  add git commands #14
 1 file changed, 111 insertions(+), 1 deletion(-)
```

### git commit --amend -m

```sh
- Correct the commit message
```

### git push

```sh
- Upload the commit to the repository

$ git push
Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 12 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 1.12 KiB | 575.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/carlamateo90/isdi-parttime-202403
   8aeb788..cd49117  feature/notes -> feature/notes
```

### git push -f

```sh
- Forces a push
```



 