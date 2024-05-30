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

const user = {name:'Peter',surname:'Grillo',email:'pepito@grillo.com',username:'pepitogrillo',password:'123123123', passwordRepeat:'123123123'}

const json = JSON.stringify(user)

xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(json)
```

- authenticate user

```sh
🐖 curl -X POST http://localhost:8080/users/auth -H "Content-Type: application/json" -d '{"username":"pepitogrillo","password":"123123123"}' -v
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

```sh
🐖 curl http://localhost:8080/posts -v
```

```js
const xhr = new XMLHttpRequest

xhr.onload = () => {
     
    if (xhr.status === 200) {

        const posts = JSON.parse(xhr.response)
        
        console.log('posts retrieved', posts)

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
🐖 curl -X POST http://localhost:8080/posts -H "Authorization: Basic peterpan" -H "Content-Type: application/json" -d '{"title":"blah","image":"https://upload.wikimedia.org/wikipedia/commons/1/1d/Blah_Blah_Blah.jpg","description":"blah blah"}' -v
```