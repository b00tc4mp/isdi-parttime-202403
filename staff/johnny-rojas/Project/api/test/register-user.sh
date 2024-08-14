curl -X POST http://localhost:8080/users  \
 -H "Content-Type: application/json"  \
 -d '{
  "name":"arma",
  "surname":"dillo",
  "email":"dillo@arma.com",
  "phone":"+34 623 111 1111",
  "password":"12345",
  "passwordRepeat":"12345"
  }' \
   -v