curl -X PATCH \
  http://localhost:8080/rooms/66b76388c316c71376f20b35/edit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmI3NjM1MWMzMTZjNzEzNzZmMjBiMmYiLCJyb2xlIjoiaG9zdCIsImlhdCI6MTcyMzM3Njc4NSwiZXhwIjoxNzIzNzIyMzg1fQ.aM1SQ5VCGlj2TKxOvkvxdc4ozrDVIs1QYcBTXld_d9o" \
  -d '{
    "nameRoom": "Jack Room",
    "region": "Norte",
    "city": "Bolivar, Ciudad",
    "image": "https://example.com/image.jpg",
    "description": "Descripción detallada de la habitación",
    "price": "100000 USD",
    "likes": []
  }' -v