## Social Code API

### Note:

This documentation is a **_WiP_**.  
With that in mind, you can continue reading.

### Prerequisites

- Ensure you have `curl` installed.
- You will need a valid API token for endpoints that require authentication.
- `jq` is optional for formatting JSON output.

The verbose option (`-v`) and piping to "`jq`" (`| jq .`) are optional and can be omitted if not needed for debugging or formatting the JSON output.

### Register a user

```sh
» curl -X POST "http://localhost:9010/users" \
-H "Content-Type: application/json" \
-d '{ "name":"Mr", "surname":"Green", "email":"mr@green.com", "username":"MrGreen", "password":"123123123", "repeatedPassword":"123123123" }' \
-v | jq .
```

or execute `test/createUser.sh` within the api directory

##### Successful Response Example

`No output`

### Authenticate a user

```sh
» curl -X POST "http://localhost:9010/users/auth" \
-H "Content-Type: application/json" \
-d '{ "username":"MrGreen", "password":"123123123" }' \
-v | jq .
```

or execute `test/authUser.sh` within the api directory

##### Successful Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5MTc5OTgwLCJleHAiOjE3MTkxODM1ODB9.X7wmZ-kBwb1Jv8fWyBMO9HODvVf0IkQLMuvZSetbcvI"
}
```

### Get a user's name

```sh
» curl -X GET "http://localhost:9010/users/MrGreen" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5ODYxMDg4LCJleHAiOjE3MTk4ODk4ODh9.VhY0mxtHGNk3A6rFCTWk0KhSMvX7eNUy4vOEfLpLPIQ" \
-v | jq .
```

or execute `test/getUsersName.sh` within the api directory

##### Successful Response Example

```json
{
  "name": "Mr"
}
```

### Get all post's

```sh
» curl -X GET "http://localhost:9010/posts" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5ODYxMDg4LCJleHAiOjE3MTk4ODk4ODh9.VhY0mxtHGNk3A6rFCTWk0KhSMvX7eNUy4vOEfLpLPIQ" \
-v | jq .
```

or execute `test/getPosts.sh` within the api directory

##### Successful Response Example

```json
{
  "page": 1,
  "limit": 10,
  "posts": [
    {
      "author": "tester",
      "title": "this is a test post title",
      "image": "https://imgs.search.brave.com/DHxbw6MrtUk2o-cyqdu0gDJwWPgHm2WH4yJzTSfCDvs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcmdlLXByZXZp/ZXdzLzllOS90ZXN0/LTEtMTQ4NjQ1OC5q/cGc_Zm10",
      "description": "this is a test post description",
      "date": "2024-07-01T18:49:09.849Z",
      "likes": ["tester2"],
      "id": "6682fa252730f888ec932134"
    }
    ...
  ],
  "total": ...
}
```

### Create a post

```sh
» curl -X POST "http://localhost:9010/posts" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5ODYxMDg4LCJleHAiOjE3MTk4ODk4ODh9.VhY0mxtHGNk3A6rFCTWk0KhSMvX7eNUy4vOEfLpLPIQ" \
-d '{ "title":"I'\''m MrGreen !", "image":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Color_icon_green.png/640px-Color_icon_green.png", "description":"I'\''m an ordinary guy; except... I'\''m green !" }' \
-v | jq .
```

or execute `test/createPost.sh` within the api directory

##### Successful Response Example

`No output`

### Delete a post

```sh
» curl -X DELETE "http://localhost:9010/posts/668309efa976e50c39900f0e" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5ODYxMDg4LCJleHAiOjE3MTk4ODk4ODh9.VhY0mxtHGNk3A6rFCTWk0KhSMvX7eNUy4vOEfLpLPIQ" \
-v | jq .
```

or execute `test/deletePost.sh` within the api directory

##### Successful Response Example

`No output`

### Like a post

```sh
» curl -X PATCH "http://localhost:9010/posts/6682fa252730f888ec932134/likes" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0ZXIzIiwiaWF0IjoxNzE5ODcwODU4LCJleHAiOjE3MTk4OTk2NTh9.RHoQlCshCE0wm0IzHl8DQZC8B181IjKlYtaCUH-wgiM" \
-v | jq .
```

or execute `test/likePost.sh` within the api directory

##### Successful Response Example

`No output`
