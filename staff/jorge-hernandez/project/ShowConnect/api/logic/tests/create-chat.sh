curl -X POST http://localhost:8080/chats -H "Content-Type: application/json" -d '{
  "users": ["64c99c9b6f9a2d0021e3db9d"],
  "messages": ["hello"]
}' -v
