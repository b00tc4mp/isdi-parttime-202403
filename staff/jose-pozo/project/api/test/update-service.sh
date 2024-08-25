curl -X PATCH \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmM4OTYwMjA0MWFlOGU1YTNjYmM1YzQiLCJpYXQiOjE3MjQ2MTUyNjAsImV4cCI6MTcyNDcwMTY2MH0.qDye1K3IOKRBfKp5QQyqbT4lJyB3XB6laLiY5sisZM0" \
-H "Content-Type: application/json" \
-d '{
    "name": "Manda",
    "surname": "Taka",
    "email": "manda@rina.com",
    "phone": "+34 699 123 456"
}' \
-v \
http://localhost:2011/servicies/66cb6ac9a72bb37245f452cf