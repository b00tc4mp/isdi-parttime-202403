curl -X POST \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmM3NWM2ZWRlNjBkMmQ1ZmZhZDJlYjMiLCJpYXQiOjE3MjQzNDEzNjEsImV4cCI6MTcyNDQyNzc2MX0.GES6740i98nNJg9WlvTOWeGhE0grXCfN5NCkbX-r_Do" \
-H "Content-Type: application/json" \
-d '{ 
  "name": "Alba",
  "surname": "Canasta",
  "email": "alba@rinho.com"
}' \
-v \
http://localhost:2011/users/customers
