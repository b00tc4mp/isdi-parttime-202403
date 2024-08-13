curl -X POST \
http://localhost:8080/create-booking/66b9cfcf7fa1ab9bd25e0444 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmI3NjMxOTA2MjEwMDY4NWJmZjI2NDUiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE3MjM1MzY5NTksImV4cCI6MTcyMzg4MjU1OX0.grxGcr2EKbJ-CZvrAgbqz61N28kCo12oxMpFlKiGd9Y" \
-d '{
  "startDate": "2024-08-15T14:00:00Z",
  "endDate": "2024-08-20T10:00:00Z"
}' -v