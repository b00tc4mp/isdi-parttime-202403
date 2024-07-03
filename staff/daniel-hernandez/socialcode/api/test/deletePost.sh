curl -X DELETE "http://localhost:9010/posts/668309efa976e50c39900f0e" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNckdyZWVuIiwiaWF0IjoxNzE5ODYxMDg4LCJleHAiOjE3MTk4ODk4ODh9.VhY0mxtHGNk3A6rFCTWk0KhSMvX7eNUy4vOEfLpLPIQ" \
    -v | jq .
