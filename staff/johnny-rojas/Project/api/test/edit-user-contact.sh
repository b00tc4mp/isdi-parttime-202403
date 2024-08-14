curl -X PATCH http://localhost:8080/users/66bbdd6d7196c3c7d1a54dbe/manage \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmJiZGQ2ZDcxOTZjM2M3ZDFhNTRkYmUiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE3MjM1ODkxOTEsImV4cCI6MTcyMzkzNDc5MX0.xPIEZgDb6ioFDxIK9mFiYxhsAWe3m1XdI3LntSgUsn0" \
-d '{
  "email": "user@user.com",
  "phone": "+34 623 333 734"
}' -v


