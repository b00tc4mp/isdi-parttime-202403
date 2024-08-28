curl -X DELETE http://localhost:8080/rooms/66cdc7df37c86049d90becbb/manage \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNkYzczMTM3Yzg2MDQ5ZDkwYmVjYjUiLCJyb2xlIjoiaG9zdCIsImlhdCI6MTcyNDc4MjcxMCwiZXhwIjoxNzI1MTI4MzEwfQ.pO9-hrd_9xGl24LCqThNv1bpmYjZKW-c9ijcszuqpRE" \
-d '{"userId": "66cdc73137c86049d90becb5", "roomId": "66cdc7df37c86049d90becbb", "bookingId": "66cf0024cfa544493d959d7a"}' -v