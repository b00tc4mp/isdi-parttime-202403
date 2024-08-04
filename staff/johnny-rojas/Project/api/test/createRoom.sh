curl -X POST http://localhost:8080/room \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmFmNDJhMmNhMjQxMmY3NmJkODBiZTciLCJpYXQiOjE3MjI3NjE5MzYsImV4cCI6MTcyMzEwNzUzNn0.UJm2ghDoV5w6nUa9Kuj_n51BkhRG_9gnr9bQyQKJAEY" \
     -H "Content-Type: application/json" \
     -d '{
"userId": "64b2e4fbc5b3f004e3a72e1b",          
    "nameRoom": "Room pool",                 
    "region": "Este",                             
    "phone": "+34 612 345 678",                   
    "image": "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg", 
    "description": "A lovely room with a pool",  
    "price": "100 USD",                          
    "availability": "Disponible",                
    "likes": [],                                
    "coordinates": [-73.97, 40.77]               
         }'