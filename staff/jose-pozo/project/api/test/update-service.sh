curl -X PATCH \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNiOGQzZDllMzM0YjU3Y2UxZjk5NjYiLCJpYXQiOjE3MjQ2ODE5NzUsImV4cCI6MTcyNDc2ODM3NX0.xZG9VdsuwZT9zTwr9wV66qw2Nn-Yd6XOAErVR-XH-nQ" \
-H "Content-Type: application/json" \
-d '{
    "serviceUpdated": {
        "name": "Manda",
        "description": "Taka",
        "category": "lasaer",
        "duration": 90,
        "price": 30
    }
}' \
-v \
http://localhost:2011/services/66cb9f97f06937d8e7c46669
