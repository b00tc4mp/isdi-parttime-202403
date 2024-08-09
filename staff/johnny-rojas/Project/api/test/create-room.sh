curl -X POST \
  http://localhost:8080/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmI2NzhkN2Y4ZTFkOWMzZGI5MTcyMGUiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE3MjMyMzQ2MjUsImV4cCI6MTcyMzU4MDIyNX0.eUgzNw83yNWYpqrCLa2tKRSPPRRkJo6h22ArFiZX35E" \
  -d '{
    "nameRoom": "Jack Room",
    "region": "Norte",
    "city": "Bolivar, Ciudad",
    "image": "https://example.com/image.jpg",
    "description": "Descripción detallada de la habitación",
    "services": ["wifi", "air conditioning"],
    "price": "100000 USD",
    "likes": []
  }' -v