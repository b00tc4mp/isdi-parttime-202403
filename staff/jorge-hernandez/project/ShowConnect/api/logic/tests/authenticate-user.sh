curl -X POST http://localhost:8080/users/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jorge@moreno.com",
    "password": "123"
  }'