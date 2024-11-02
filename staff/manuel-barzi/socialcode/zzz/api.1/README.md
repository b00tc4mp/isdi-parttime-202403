- list users

```sh
🐖 curl http://localhost:8080/users -v
```

- create user

```sh
🐖 curl -X POST http://localhost:8080/users -d '{"name":"Pepito","surname":"Grillo","email":"pepito@grillo.com","username":"pepitogrillo","password":"123123123"}' -v
```

- list posts

```sh
🐖 curl http://localhost:8080/posts -v
```
