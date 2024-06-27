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
🐖 curl -X POST http://localhost:8080/users/auth -H "Content-Type: application/json" -d '{"username":"AdrianGon","password":"321321321"}' -v
```

- get user name

```sh
🐖 curl http://localhost:8080/users/AdrianGon -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZHJpYW5Hb24iLCJpYXQiOjE3MTg3MzY3NTgsImV4cCI6MTcxODc0MDM1OH0.abhG3rqw9V6XdNZ4Qzs09Xs2ysbMHa5OprRJtm5VyjI" -v
```

- get all posts

```sh
🐖 curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZHJpYW5Hb24iLCJpYXQiOjE3MTg3ODk5NDEsImV4cCI6MTcxODc5MzU0MX0.nKzPApr26Fr15DMWxBNe7k0QbBDE21E1yllUNJBgozQ" http://localhost:8080/posts -v
```

- create post

```sh
🐖 $ curl -X POST http://localhost:8080/posts -H "Authorization: Basic AdrianGon" -H "Content-Type: application/json" -d '{"title":"Buenos Dias","image":"https://imgs.search.brave.com/J8imP8bduv7lIhsfCsnGwaeKNgdHqp2g5dCpK8aVkYA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzAzLzM2LzA0/LzM2MF9GXzEwMzM2/MDQyNV9IekJxZEkx/d1dOTjBWU3Z2ZXkw/R3RRTlRvaDJLenhy/Ny5qcGc","description":"blah blah"}' -v
```

- delete post

```sh
🐖 $ curl -X DELETE http://localhost:8080/posts/7956804321626201-1716989998980 -H "Authorization: Basic AdrianGon" -v
```