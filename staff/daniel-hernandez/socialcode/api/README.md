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
» curl -X POST "http://localhost:8080/users" \
-H "Content-Type: application/json" \
-d '{ "name":"Mr", "surname":"Green", "email":"mr@green.com", "username":"MrGreen", "password":"123123123", "repeatedPassword":"123123123" }' \
-v | jq .
```

##### Successful Response Example

`No output`

### Authenticate a user

```sh
» curl -X POST "http://localhost:8080/users/auth" \
-H "Content-Type: application/json" \
-d '{ "username":"MrGreen", "password":"123123123" }' \
-v | jq .
```

##### Successful Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5MTc5OTgwLCJleHAiOjE3MTkxODM1ODB9.X7wmZ-kBwb1Jv8fWyBMO9HODvVf0IkQLMuvZSetbcvI"
}
```

### Get a user's name

```sh
» curl -X GET "http://localhost:8080/users/MrGreen" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5MTc3MDExLCJleHAiOjE3MTkxODA2MTF9.IpiVaJQGzeYGa_rchh0ijtkJdYdDhNTldT4eJcUbfkw" \
-v | jq .
```

##### Successful Response Example

```json
{
  "name": "Mr"
}
```

### Get all post's

```sh
» curl -X GET "http://localhost:8080/posts" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5MTc3MDExLCJleHAiOjE3MTkxODA2MTF9.IpiVaJQGzeYGa_rchh0ijtkJdYdDhNTldT4eJcUbfkw" \
-v | jq .
```

##### Successful Response Example

```json
{
  "posts": [
    {
      "id": "lxs2fs4pec9pa",
      "author": "MrGreen",
      "title": "I'm MrGreen !",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Color_icon_green.png/640px-Color_icon_green.png",
      "description": "I'm an ordinary guy; except... I'm green !",
      "date": "2024-06-23T21:33:31.561Z"
    },
    ...
    ]
}
```

### Create a post

```sh
» curl -X POST "http://localhost:8080/posts" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5MTc3MDExLCJleHAiOjE3MTkxODA2MTF9.IpiVaJQGzeYGa_rchh0ijtkJdYdDhNTldT4eJcUbfkw" \
-d '{ "title":"I'\''m MrGreen !", "image":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Color_icon_green.png/640px-Color_icon_green.png", "description":"I'\''m an ordinary guy; except... I'\''m green !" }' \
-v | jq .
```

##### Successful Response Example

`No output`

### Delete a post

```sh
» curl -X DELETE "http://localhost:8080/posts/lxs3lih5ctykp" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5MTc3MDExLCJleHAiOjE3MTkxODA2MTF9.IpiVaJQGzeYGa_rchh0ijtkJdYdDhNTldT4eJcUbfkw" \
-v | jq .
```

##### Successful Response Example

`No output`
