curl -v -X PATCH http://localhost:8080/games/66b811a84632cead45a0f3e4/edit \
-H "Authorization: Bearer <token>" \
-H "Content-type: application/json" \
-d '{
  "title": "New Game Title",
  "image": "https://example.com/new-image.png",
  "rating": 5,
  "hours": 10
}'