curl -X POST \
     -H "Content-Type: application/json" \
     -d '{
           "username": "JonSnow",
           "email": "jon@snow.com",
           "password": "1234",
           "passwordRepeat": "1234",
           "name": "Jon",
           "surname": "Snow",
           "role": "provider",
           "phone": "123456789"
         }' \
     -v \
     http://localhost:2011/users


