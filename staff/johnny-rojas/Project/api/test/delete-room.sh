curl -X DELETE http://localhost:8080/rooms/66b9bafcc55ff5f2bb687607/manage \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmI3NjM1MWMzMTZjNzEzNzZmMjBiMmYiLCJyb2xlIjoiaG9zdCIsImlhdCI6MTcyMzM5MTUzMiwiZXhwIjoxNzIzNzM3MTMyfQ.rznLWOdWSOI8RrlDqVOQ9MRH1RXT2LuChLI1c2H9I-0" \
-d '{"userId": "66b76351c316c71376f20b2f", "roomId": "66b9bafcc55ff5f2bb687607"}' -v