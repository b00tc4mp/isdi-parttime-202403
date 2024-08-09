curl -X POST http://localhost:8080/user  \
 -H "Content-Type: application/json"  \
 -d '{
  "name":"arma",
  "surname":"dillo",
  "email":"arma@dillo.com",
  "phone":"+34 623 333 734",
  "password":"1234",
  "passwordRepeat":"1234"
  }' \
   -v