curl -X PATCH "http://localhost:9010/posts/6682fa252730f888ec932134/likes" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0ZXIzIiwiaWF0IjoxNzE5ODcwODU4LCJleHAiOjE3MTk4OTk2NTh9.RHoQlCshCE0wm0IzHl8DQZC8B181IjKlYtaCUH-wgiM" \
    -v | jq .
