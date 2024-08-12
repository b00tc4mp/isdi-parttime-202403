curl -X POST \
http://localhost:8080/create-booking/66b9ceca7fa1ab9bd25e042e \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmI3NjM1MWMzMTZjNzEzNzZmMjBiMmYiLCJyb2xlIjoiaG9zdCIsImlhdCI6MTcyMzQ5MjIxMiwiZXhwIjoxNzIzODM3ODEyfQ.0tsXOKlEkO1wGh3BlOmp4rHGIHzTHHT0Qdl6yCK7Cm0" \
-d '{
  "startDate": "2024-08-15T14:00:00Z",
  "endDate": "2024-08-20T10:00:00Z"
}' -v