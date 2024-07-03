curl -X POST "http://localhost:9010/users/auth" \
    -H "Content-Type: application/json" \
    -d '{ "username":"MrGreen", "password":"123123123" }' \
    -v | jq .
