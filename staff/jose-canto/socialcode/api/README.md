- list users

```sh
🐖 curl http://localhost:8080/users -v
```

- register user

```sh
🐖 curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d '{"name":"Pepito","surname":"Grillo","email":"pepito@grillo.com","username":"pepitogrillo","password":"123123123","passwordRepeat":"123123123"}' -v
```

```js
const xhr = new XMLHttpRequest
xhr.onload = () => {
    debugger
    
    if (xhr.status === 201) {
        console.log('user registered')
        return
    }
    const { error, message } = JSON.parse(xhr.response)
    console.error(error, message)
}

xhr.open('POST', 'http://localhost:8080/users')

const body = {name:'Peter',surname:'Grillo',email:'pepito@grillo.com',username:'pepitogrillo',password:'123123123', passwordRepeat:'123123123'}

const json = JSON.stringify(body)

xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(json)
```

- get user name

```sh
curl http://localhost:8080/users/Jack -H "Authorization: Basic Jack" -v 

```

- authenticate user

```sh
🐖 curl -X POST http://localhost:8080/users/auth -H "Content-Type: application/json" -d '{"username":"Jack","password":"1234"}' -v
```

```js
const xhr = new XMLHttpRequest
xhr.onload = () => {
    debugger
    

    if (xhr.status === 200) {
        console.log('user authenticated')
        return
    }
    const { error, message } = JSON.parse(xhr.response)
    console.error(error, message)
}

xhr.open('POST', 'http://localhost:8080/users/auth')

const body = {username:"Jacks", password:'1234'}

const json = JSON.stringify(body)

xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(json)

```

- list posts

```sh
🐖 curl http://localhost:8080/posts -v
```

```js
const xhr = new XMLHttpRequest
xhr.onload = () => {
    
    if (xhr.status === 200) {
        const posts = JSON.parse(xhr.response)
        console.log("post retrieved", posts)
        return
    }
    const { error, message } = JSON.parse(xhr.response)
    console.error(error, message)
}

xhr.open('GET', 'http://localhost:8080/posts')
xhr.send()
```

- create post

```sh
curl -X POST http://localhost:8080/posts -H "Authorization: Basic Luna" -H "Content-Type: application/json" -d '{"title":"blah","image":"https://m.media-amazon.com/images/I/41xsPjrM-pL._AC_UF350,350_QL50_.jpg","description":"blah blah"}' -v
```

- delete post

```sh
curl -X DELETE http://localhost:8080/posts/3357405759613019-1716455311899 -H "Authorization: Basic Luna"  -v
```
