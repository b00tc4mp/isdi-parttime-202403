curl "http://localhost:9010/users" \
	-H "Content-Type: application/json" \
	-d '{ "name":"Mr", "surname":"Green", "email":"mr@green.com", "username":"MrGreen", "password":"123123123", "repeatedPassword":"123123123" }' \
	-v | jq .
