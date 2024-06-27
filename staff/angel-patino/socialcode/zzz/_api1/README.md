- list users

```sh
🐖 curl http://localhost:8080/users -v
```

- register user

```sh
🐖 curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d '{"name":"Pepito","surname":"Grillo","email":"pepito@grillo.com","username":"pepitogrillo","password":"123123123","passwordRepeat":"123123123"}' -v
```

- authenticate user

```sh
🐖 curl -X POST http://localhost:8080/users/auth -H "Content-Type: application/json" -d '{"username":"pepitogrillo","password":"123123123"}' -v
```

- get user name

```sh
🐖 curl http://localhost:8080/users/pepitogrillo -H "Authorization: Basic peterpan" -v
```

- list posts

```sh
🐖 curl http://localhost:8080/posts -v
```

- create post

```sh
🐖 curl -X POST http://localhost:8080/posts -H "Authorization: Basic peterpan" -H "Content-Type: application/json" -d '{"title":"blah","image":"https://upload.wikimedia.org/wikipedia/commons/1/1d/Blah_Blah_Blah.jpg","description":"blah blah"}' -v
```

- delete post

```sh
🐖 curl -X DELETE http://localhost:8080/posts/8826114904894882-1716924151129 -H "Authorization: Basic peterpan" -v
```
