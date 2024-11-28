curl "http://localhost:9010/posts" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njk5OGVlNGZhMmZmN2IxZTlhYzAwMDgiLCJpYXQiOjE3MjEzMzk2NjUsImV4cCI6MTcyMzkzMTY2NX0.8meIVwvDLzzuQM_gxZ3J024kadKFyxVAI7mjzvOf1Mc" \
	-v | jq .
