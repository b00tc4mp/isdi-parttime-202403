curl -X POST \
     -H "Content-Type: application/json" \
     -d '{
           "username": "jon@snow.com",
           "password": "1234"
         }' \
     -v \
     http://localhost:2011/users/auth
