curl -X POST \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Jon",
           "surname": "Snow",
           "email": "jon@snow.com",
           "password": "1234",
           "passwordRepeat": "1234",
           "role": "provider",
           "phone": "123456789"
         }' \
     -v \
     http://localhost:2011/users


