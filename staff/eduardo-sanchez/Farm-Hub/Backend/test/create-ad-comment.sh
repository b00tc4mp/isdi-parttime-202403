curl -X PATCH http://localhost:8080/ads/66f423dd3daf49cabae6ffd3/comments -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU0ODc5NzMwY2I2M2Y5N2JiYzIzZTUiLCJpYXQiOjE3Mjc4MDg3ODIsImV4cCI6MTczMDQwMDc4Mn0.WC72aPu3Y-m4EsrnNpnY_vWVBjhLgWriepbfCQPyd7k" -H "Content-Type: application/json" -d '{"text":"blah blah"}' -v