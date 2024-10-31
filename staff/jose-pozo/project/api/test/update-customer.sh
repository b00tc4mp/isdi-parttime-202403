curl -X PATCH \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmMyMmZmZjY5OGM4YTg2MDRlZTU2MWEiLCJpYXQiOjE3MjQyMzQ4OTksImV4cCI6MTcyNDMyMTI5OX0.LC8EpsyU0ovscEgkbTuPOU-mMK9zkLf4_AFQs-MEF-U" \
-H "Content-Type: application/json" \
-d '{
    "name": "Manda",
    "surname": "Taka",
    "email": "manda@rina.com",
    "phone": "+34 699 123 456"
}' \
-v \
http://localhost:2011/users/66c4865d822a5cbdc12afc6d