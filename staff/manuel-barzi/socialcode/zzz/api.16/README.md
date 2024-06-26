
- authenticate user

```sh
🐖 curl -X POST http://localhost:8080/users/auth -H "Content-Type: application/json" -d '{"username":"pepitogrillo","password":"123123123"}' -v
```

- get user name

```sh
🐖 curl http://localhost:8080/users/pepitogrillo -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3ZW5keWRhcmxpbmciLCJpYXQiOjE3MTg2NTExMDAsImV4cCI6MTcxODY1NDcwMH0.XcfzV8eMk7dv8kawAArnIqbECPkv2dZI8px2zKbI8s4" -v
```

- get all posts

```sh
🐖 curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXBpdG9ncmlsbG8iLCJpYXQiOjE3MTg3MzMyOTAsImV4cCI6MTcxODczNjg5MH0.wRhT3s-62X7hS3oxH0cMAulEy7smhzyVpibkvfLjXFQ" http://localhost:8080/posts -v
```

- create post

```sh
🐖 curl -X POST http://localhost:8080/posts -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXBpdG9ncmlsbG8iLCJpYXQiOjE3MTg2NTI4OTgsImV4cCI6MTcxODY1NjQ5OH0.cVvHfJ_cE-dDMgD9UduooRkPG6Dxa09PRKZnABDxj2I" -H "Content-Type: application/json" -d '{"title":"blah","image":"https://upload.wikimedia.org/wikipedia/commons/1/1d/Blah_Blah_Blah.jpg","description":"blah blah"}' -v
```

- delete post

```sh
🐖 curl -X DELETE http://localhost:8080/posts/8826114904894882-1716924151129 -H "Authorization: Basic peterpan" -v
```
