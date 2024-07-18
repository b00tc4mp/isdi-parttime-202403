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
» curl "http://localhost:9010/users" \
	-H "Content-Type: application/json" \
	-d '{ "name":"Mr", "surname":"Green", "email":"mr@green.com", "username":"MrGreen", "password":"123123123", "repeatedPassword":"123123123" }' \
	-v | jq .
```

or execute `test/createUser.sh` within the api directory

##### Successful Response Example

`No output`

### Authenticate a user

```sh
» curl "http://localhost:9010/users/auth" \
	-H "Content-Type: application/json" \
	-d '{ "username":"MrGreen", "password":"123123123" }' \
	-v | jq .
```

or execute `test/authUser.sh` within the api directory

##### Successful Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njg5ZGQyMTkxOTM5MWU5M2VmNTdmZGYiLCJpYXQiOjE3MjAzMTEzODEsImV4cCI6MTcyMjkwMzM4MX0.S9tdFls6sK5PxXRcqmC62Bk9YC6Yvhrh6MbOW2TeAfA"
}
```

### Get a user's name

```sh
» curl "http://localhost:9010/users/66998f609e4a02acb2927f4e" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njk5OGVlNGZhMmZmN2IxZTlhYzAwMDgiLCJpYXQiOjE3MjEzMzk2NjUsImV4cCI6MTcyMzkzMTY2NX0.8meIVwvDLzzuQM_gxZ3J024kadKFyxVAI7mjzvOf1Mc" \
	-v | jq .
```

or execute `test/getUsersName.sh` within the api directory

##### Successful Response Example

```json
{
  "name": "testerName"
}
```

### Get all post's

```sh
» curl "http://localhost:9010/posts" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njk5OGVlNGZhMmZmN2IxZTlhYzAwMDgiLCJpYXQiOjE3MjEzMzk2NjUsImV4cCI6MTcyMzkzMTY2NX0.8meIVwvDLzzuQM_gxZ3J024kadKFyxVAI7mjzvOf1Mc" \
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
      "author": {
        "username": "tester",
        "id": "66877d12b1faa9184be8cf9c"
      },
      "title": "this is a test post title",
      "image": "https://imgs.search.brave.com/DHxbw6MrtUk2o-cyqdu0gDJwWPgHm2WH4yJzTSfCDvs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcmdlLXByZXZp/ZXdzLzllOS90ZXN0/LTEtMTQ4NjQ1OC5q/cGc_Zm10",
      "description": "this is a test post description",
      "date": "2024-07-06T23:42:27.821Z",
      "likes": ["6689d7a2c1cc123de17f7b63"],
      "id": "6689d6632178522b8434a930"
    }
  ],
  "total": 1
}
```

### Create a post

```sh
» curl "http://localhost:9010/posts" \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njk5OGVlNGZhMmZmN2IxZTlhYzAwMDgiLCJpYXQiOjE3MjEzMzk2NjUsImV4cCI6MTcyMzkzMTY2NX0.8meIVwvDLzzuQM_gxZ3J024kadKFyxVAI7mjzvOf1Mc" \
	-d '{ "title":"I'\''m MrGreen !", "image":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Color_icon_green.png/640px-Color_icon_green.png", "description":"I'\''m an ordinary guy; except... I'\''m green !" }' \
	-v | jq .
```

or execute `test/createPost.sh` within the api directory

##### Successful Response Example

`No output`

### Delete a post

```sh
» curl -X DELETE "http://localhost:9010/posts/66999003fa2ff7b1e9ac0013" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njk5OGVlNGZhMmZmN2IxZTlhYzAwMDgiLCJpYXQiOjE3MjEzMzk2NjUsImV4cCI6MTcyMzkzMTY2NX0.8meIVwvDLzzuQM_gxZ3J024kadKFyxVAI7mjzvOf1Mc" \
	-v | jq .
```

or execute `test/deletePost.sh` within the api directory

##### Successful Response Example

`No output`

### Like a post

```sh
» curl -X PATCH "http://localhost:9010/posts/66999014fa2ff7b1e9ac0016/likes" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njk5OGVlNGZhMmZmN2IxZTlhYzAwMDgiLCJpYXQiOjE3MjEzMzk2NjUsImV4cCI6MTcyMzkzMTY2NX0.8meIVwvDLzzuQM_gxZ3J024kadKFyxVAI7mjzvOf1Mc" \
	-v | jq .
```

or execute `test/likePost.sh` within the api directory

##### Successful Response Example

`No output`
