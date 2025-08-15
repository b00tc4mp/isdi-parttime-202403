- list users

```sh
curl (-X GET) http://localhost:8080/users -v
```

- create user

```sh
curl -X POST http://localhost:8080/users -d '{"email":"RotoJaz@example.com","username":"RotoJaz","password":"1234"}' -v

```
- create post

```sh
curl -X POST http://localhost:8080/posts -d '{"author":"RotoJaz","title":"Lion Leo","image":"https://koalahospital.org.au/cdn/shop/products/f7p40CJBP5hB09Vp6TeSXFwMe0E_lion-leo-adoption-certificate.jpg?v=1608174739&width=600","description":"Released  In September 2019 a home owner found a young male koala in the backyard with her dogs and was concerned he may have been attacked. Our rescue team was despatched, and the young koala was captured. On examination at the Koala Hospital, staff were pleased to find he only had a laceration on one foot. They also found he had amazing, beautiful blue eyes. This is a very rare genetic phenomenon in koalas.  Lion Leo is now back in his home range and who knows, in the future, we may have more blue-eyed koalas from Leos’ offspring."}' -v

```
- list posts

```sh
curl (-X GET) http://localhost:8080/posts -v

