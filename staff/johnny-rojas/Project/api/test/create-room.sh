curl -X POST http://localhost:8080/rooms \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmFmNDJhMmNhMjQxMmY3NmJkODBiZTciLCJpYXQiOjE3MjI3NjE5MzYsImV4cCI6MTcyMzEwNzUzNn0.UJm2ghDoV5w6nUa9Kuj_n51BkhRG_9gnr9bQyQKJAEY" \
     -H "Content-Type: application/json" \
     -d '{
  "userId": "64b2e4fbc5b3f004e3a72e1b",
  "nameRoom": "Room pool",
  "region": "Este",
  "city": "Caracas, DF",
  "image": "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  "description": "A lovely room with a pool",
  "price": "100 USD",
  "availability": {
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T23:59:59Z"
  },
  "likes": [],
  "coordinates": {
    "lat": 40.77,
    "lng": -73.97
  }
}' -v