curl -v -X PATCH http://localhost:8080/games/66b811a84632cead45a0f3e4/edit -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmE5ZTMzZDZmYzM2ZjY0ZTk5NjdlMjIiLCJpYXQiOjE3MjM0NTQ5MzQsImV4cCI6MTcyNDMxODkzNH0.g9Nznwg21dcXS3wBTd1IMFIIeSKPOSCmXNEnAZpJ40o" -H "Content-type: application/json" -d '{"title":"JhonnyGame","image":"https://example.com/new-image.png","rating":5,"hours":10}'
