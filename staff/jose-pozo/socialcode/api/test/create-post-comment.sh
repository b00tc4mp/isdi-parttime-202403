# curl -X PATCH http://localhost:8080/posts/668558a77fa63fe6c798229c/comments -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEYWVuZXJ5c1RhcmdhcnllbiIsImlhdCI6MTcyMDAxMzE3NywiZXhwIjoxNzIwMDE2Nzc3fQ.b7RJllzm34MmQdCfth4quoHo2YVUYcD5eAh8eO4gC0k" -H "Content-Type: application/json" -d '{"comment":"You are all the time...blah, blah, blah"}' -v


curl -X PATCH http://localhost:8080/posts/668558a77fa63fe6c798229c/comments \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEYWVuZXJ5c1RhcmdhcnllbiIsImlhdCI6MTcyMDAxMzg5NiwiZXhwIjoxNzIwMDE3NDk2fQ.YmLwL4yoIlNn8usroE8dCZnjvqDMat5YJXhVZvlms4k" \
-H "Content-Type: application/json" \
-d '{"author":"DaenerysTargaryen","comment":"You are all the time...blah, blah, blah"}' \
-v
