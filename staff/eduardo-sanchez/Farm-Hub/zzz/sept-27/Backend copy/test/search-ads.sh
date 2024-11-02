# curl http://localhost:8080/searchads/'p' -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU0ODc5NzMwY2I2M2Y5N2JiYzIzZTUiLCJpYXQiOjE3MjcyODUyNzMsImV4cCI6MTcyOTg3NzI3M30.ZPnRDfDP7D1kqUNrUzs9l81YDVtQWweKliP79GzzWzs" -H "Content-Type: application/json" -d '{"lat": 39.466945, "lng": -6.3758094, "maxDistance": 50}' -v


# -H "Content-Type: application/json" -d '{"title":"pimientos","description":"pimiento italiano","price":"2.50 €/Kg", "contactInfo":"122-122-122", "geoLocation":{"lat":40.4168,"lng":-3.7038}}' -v



# curl http://localhost:8080/searchads/ -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmFlNjM3MGYxMTA4MmVkN2YwNjIzZGQiLCJpYXQiOjE3MjM3MDM5OTgsImV4cCI6MTcyNjI5NTk5OH0.h0YM7mDvb5D8IN-TfezeNyeGN2H2Ht10Xxd0OVEbOS0" -H "Content-Type: application/json" -d '{"searchText":"p", "userLocation":{"lat": 39.466945,"long":-6.3758094}, "maxDistance":50}' -v

# curl X- GET http://localhost:8080/searchads/p -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU0ODc5NzMwY2I2M2Y5N2JiYzIzZTUiLCJpYXQiOjE3MjcyODUyNzMsImV4cCI6MTcyOTg3NzI3M30.ZPnRDfDP7D1kqUNrUzs9l81YDVtQWweKliP79GzzWzs" -H "Content-Type: application/json" -d '{"lat": 39.466945, "lng": -6.3758094, "maxDistance": 50}' -v

curl -X GET "http://localhost:8080/searchads/p?lat=39.466945&lng=-6.3758094&maxDistance=50" \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU0ODc5NzMwY2I2M2Y5N2JiYzIzZTUiLCJpYXQiOjE3MjcyODUyNzMsImV4cCI6MTcyOTg3NzI3M30.ZPnRDfDP7D1kqUNrUzs9l81YDVtQWweKliP79GzzWzs" \
     -v