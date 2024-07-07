curl "http://localhost:9010/users/66877d12b1faa9184be8cf9c" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njg5ZGQyMTkxOTM5MWU5M2VmNTdmZGYiLCJpYXQiOjE3MjAzMTE5NDUsImV4cCI6MTcyMjkwMzk0NX0.07JU5qKqWi4rGt2lTGwGsENvMxtCwfO8Q5b9JuXxGRI" \
	-v | jq .
