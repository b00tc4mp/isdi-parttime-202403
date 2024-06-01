- list users

```sh
curl (-X GET) http://localhost:8080/users -v
```

- register user

```sh
curl -X POST http://localhost:8080/users -H "Content-Type: application/json"  -d '{"email":"RotoJaz@example.com","username":"RotoJaz","password":"1234","passwordRepeat":"1234"}' -v

```

- authenticate user

```sh
curl -X POST http://localhost:8080/users/auth -H "Content-Type: application/json" -d '{"username":"RotoJaz","password":"1234"}' -v
```

- get user name

```sh
curl http://localhost:8080/users/RotoJaz -H "Authorization: Basic RotoJaz" -v
```

- create post

```sh
curl -X POST http://localhost:8080/posts -H "Content-Type: application/json"  -d '{"author":"RotoJaz","title":"Lion Leo","image":"https://koalahospital.org.au/cdn/shop/products/f7p40CJBP5hB09Vp6TeSXFwMe0E_lion-leo-adoption-certificate.jpg?v=1608174739&width=600","description":"Released  In September 2019 "}' -v

curl -X POST http://localhost:8080/posts -H "Authorization: Basic RotoJaz" -H "Content-Type: application/json" -d '{"title":"Lion Leo","image":"https://koalahospital.org.au/cdn/shop/products/f7p40CJBP5hB09Vp6TeSXFwMe0E_lion-leo-adoption-certificate.jpg?v=1608174739&width=600","description":"Blah blah "}' -v

```

- list posts

```sh
curl (-X GET) http://localhost:8080/posts -v (por defecto hace un GET)
curl http://localhost:8080/posts -v

```

- delete post
