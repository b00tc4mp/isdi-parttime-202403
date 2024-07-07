curl "http://localhost:9010/posts" \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njg5ZGQyMTkxOTM5MWU5M2VmNTdmZGYiLCJpYXQiOjE3MjAzMTE5NDUsImV4cCI6MTcyMjkwMzk0NX0.07JU5qKqWi4rGt2lTGwGsENvMxtCwfO8Q5b9JuXxGRI" \
	-d '{ "title":"I'\''m MrGreen !", "image":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Color_icon_green.png/640px-Color_icon_green.png", "description":"I'\''m an ordinary guy; except... I'\''m green !" }' \
	-v | jq .
