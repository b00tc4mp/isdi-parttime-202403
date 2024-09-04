curl -X DELETE http://localhost:8080/rooms/66cdcacd37c86049d90bece1/manage/booking \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNkYzg4ODM3Yzg2MDQ5ZDkwYmVjYzAiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE3MjQ3NjIyNjIsImV4cCI6MTcyNTEwNzg2Mn0.Eeg4m7bGg0rhT3h61UDhaKMBNjjmQ1kvvSzch6zCK_8" \
-d '{"userId": "66cdc88837c86049d90becc0", "roomId": "66cdcacd37c86049d90bece1", "bookingId": "66cf170581f09f39cb445acb"}' -v