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
🐖 curl http://localhost:8080/users/pepitogrillo -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXBpdG9ncmlsbG8iLCJpYXQiOjE3MTg3OTg5NjgsImV4cCI6MTcxODgwMjU2OH0.aX_xV3VSpHrbDqznlPfAORLCCEQlnxM-Zt8ubmStzA4" -v

🐖 curl http://localhost:8080/users/pepitogrillo -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXRlcnBhbiIsImlhdCI6MTcxODc5ODk2OCwiZXhwIjoxNzE4ODAyNTY4fQ.aX_xV3VSpHrbDqznlPfAORLCCEQlnxM-Zt8ubmStzA4" -v

///////////////////////////////////////////////////////////////////////

🐖 curl http://localhost:8080/users/manzana -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXBpdG9ncmlsbG8iLCJpYXQiOjE3MTg4MDE2MDAsImV4cCI6MTcxODgwNTIwMH0.sGk2sd-sR5oF5xZVyBkxIl3surLx4bkuq5GTMxptp0Y" -v

🐖 curl http://localhost:8080/users/manzana -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW56YW5hIiwiaWF0IjoxNzE4ODAxNjAwLCJleHAiOjE3MTg4MDUyMDB9.sGk2sd-sR5oF5xZVyBkxIl3surLx4bkuq5GTMxptp0Y" -v
```

- list posts

```sh
🐖 curl http://localhost:8080/posts -v
```

- create post

```sh
🐖 curl -X POST http://localhost:8080/posts -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXBpdG9ncmlsbG8iLCJpYXQiOjE3MTg4MDkwODEsImV4cCI6MTcxODgxMjY4MX0.MBrSi-L8rPKH-E0EzIW268dMbb0AsEBnaPYLEzhoR78" -H "Content-Type: application/json" -d '{"title":"blah","image":"https://upload.wikimedia.org/wikipedia/commons/1/1d/Blah_Blah_Blah.jpg","description":"blah blah"}' -v
```

- delete post

```sh
🐖 curl -X DELETE http://localhost:8080/posts/4007381802005925-1717082344121 -H "Authorization: Basic peterpan" -v
```

- comprobacion acceso cabeceras CORS 
Cuando un navegador realiza una solicitud HTTP a un servidor en un dominio diferente, envía una solicitud preflight (de verificación previa) utilizando el método OPTIONS. Esta solicitud verifica si el servidor permite la solicitud real.

```sh
🐖 curl -X OPTIONS http://localhost:8080/users/auth -v
```