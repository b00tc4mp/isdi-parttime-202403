curl -X POST http://localhost:8080/posts -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Njg2ZDUwNDk2NWZlNDZhNDFiMGQ3YTIiLCJpYXQiOjE3MjAxMTczNjQsImV4cCI6MTcyMDEyMDk2NH0.dWO0oAAd_e2UGcDQJaBIsgDKiR_wrD1wV7kdeSOAXOc" -H "Content-Type: application/json" -d '{"title":"blah","image":"https://upload.wikimedia.org/wikipedia/commons/1/1d/Blah_Blah_Blah.jpg","description":"blah blah"}' -v