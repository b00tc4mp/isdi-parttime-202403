curl -X POST \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNiOGQzZDllMzM0YjU3Y2UxZjk5NjYiLCJpYXQiOjE3MjQ3NjkzNDYsImV4cCI6MTcyNDg1NTc0Nn0.mOTdh_Qo4V-YxroY-9iKaywREBAJrDrbuaokmZfrgKQ" \
-H "Content-Type: application/json" \
-d '{ 
"customerId": "66cba82ff06937d8e7c466d9",
"serviceId": "66ccaf55595c6815e0efdc43",
"date": "2022-10-01",
"time": "10:00",
"status": "pending"
}' \
-v \
http://localhost:2011/users/appointments
