curl -X POST \
  http://localhost:8080/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmI3MWU3ZDIzMGFhMTdkZjc1NjY0YjEiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE3MjMyNzY5MjcsImV4cCI6MTcyMzYyMjUyN30.RRC5trqtizvIIlAouehg_pijref2dCnBwtR5ZlwX29M" \
  -d '{
    "nameRoom": "Jack Room",
    "region": "Norte",
    "city": "Bolivar, Ciudad",
    "image": "https://example.com/image.jpg",
    "description": "Descripción detallada de la habitación",
    "services": [],
    "price": "100000 USD",
    "likes": []
  }' -v