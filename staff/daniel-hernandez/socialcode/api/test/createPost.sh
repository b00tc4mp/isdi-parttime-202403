curl -X POST "http://localhost:9010/posts" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5ODYxMDg4LCJleHAiOjE3MTk4ODk4ODh9.VhY0mxtHGNk3A6rFCTWk0KhSMvX7eNUy4vOEfLpLPIQ" \
    -d '{ "title":"I'\''m MrGreen !", "image":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Color_icon_green.png/640px-Color_icon_green.png", "description":"I'\''m an ordinary guy; except... I'\''m green !" }' \
    -v | jq .
