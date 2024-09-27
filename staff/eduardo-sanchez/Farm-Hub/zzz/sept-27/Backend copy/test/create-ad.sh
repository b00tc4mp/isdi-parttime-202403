curl -X POST http://localhost:8080/ads/createAd -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU0ODc5NzMwY2I2M2Y5N2JiYzIzZTUiLCJpYXQiOjE3MjY4MjgyNTUsImV4cCI6MTcyOTQyMDI1NX0.vW_sgudYt9b9lyxl5xZFTiPJHJ-dU43MNn0WdSYc60U" -H "Content-Type: application/json" -d '{"title":"pimientos","description":"pimiento italiano","price":"2.50 €/Kg", "contactInfo":"122-122-122", "geoLocation":{"lat":40.4168,"lng":-3.7038}}' -v
                
# curl -X POST http://localhost:8080/ads \
# -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmE5MzlkZGNhNzk5NTgxYTg0NTcxMWMiLCJpYXQiOjE3MjMwMzM0MzcsImV4cCI6MTcyNTYyNTQzN30.cU13Bft_r2kw3-AtIRrLXrZe90z4qhjxj6uA2EsV0f0" \
# -H "Content-Type: application/json" \
# -d '{"title":"pimientos","description":"pimiento italiano","price":"2.50 €/Kg","geoLocation":{"lat":40.4168,"lng":-3.7038}}' \
# -v