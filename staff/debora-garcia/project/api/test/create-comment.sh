curl -X POST http://localhost:8080/posts/66c9a2ab7327afe8d24678b1/comments -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmIwYjhmZjMzN2MyYjYxNGEyNjU4M2IiLCJpYXQiOjE3MjQzMjM1NDgsImV4cCI6MTcyNDkyODM0OH0.8Nq2sNjGuwAiLNQbEfDt0OsM-1S6Jv-VO587J76iaHo" -H "Content-Type: application/json" -d '{"text":"my first comment with curl"}' -v

