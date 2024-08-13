curl -X POST \
     -H "Content-Type: application/json" \
     -d '{
           "email": "jon@snow.com",
           "password": "1234"
         }' \
     -v \
     http://localhost:2011/users/auth
