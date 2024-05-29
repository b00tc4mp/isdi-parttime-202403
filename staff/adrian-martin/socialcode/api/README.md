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
- authenticate user

```sh
🐖 curl -X POST http://localhost:8080/users/auth -H "Content-Type: application/json" -d '{"username":"AdrianGon","password":"321321321"}' -v
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

const body = {username:'pepitogrillo',password:'123123123'}

const json = JSON.stringify(body)

xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(json)
```
- list posts

```js
const xhr = new XMLHttpRequest

xhr.onload = () => {
    if (xhr.status === 200) {
        const posts = JSON.parse(xhr.response)
        
        console.log('posts retrived', posts)

        return
    }

    const { error, message } = JSON.parse(xhr.response)

    console.error(error, message)
}

xhr.open('GET', 'http://localhost:8080/posts')

xhr.send()
```
```sh
🐖 curl http://localhost:8080/posts -v
```

- create post

```sh
🐖 $ curl -X POST http://localhost:8080/posts -H "Authorization: Basic AdrianGon" -H "Content-Type: application/json" -d '{"title":"Buenos Dias","image":"https://imgs.search.brave.com/J8imP8bduv7lIhsfCsnGwaeKNgdHqp2g5dCpK8aVkYA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzAzLzM2LzA0/LzM2MF9GXzEwMzM2/MDQyNV9IekJxZEkx/d1dOTjBWU3Z2ZXkw/R3RRTlRvaDJLenhy/Ny5qcGc","description":"blah blah"}' -v
```