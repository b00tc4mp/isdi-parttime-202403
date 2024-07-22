# curl -X POST http://localhost:9010/users/auth -H "Content-Type: application/json" -d '{"username":"peterpan","password":"123123123"}' -v

#!/bin/bash
curl -X POST http://localhost:9010/users/auth -H "Content-Type: application/json" -d '{"username":"unobueno","password":"123123123"}' -v


# curl -X POST http://localhost:9010/users/auth -H "Content-Type: application/json" -d '{"username":"lolobolo","password":"123123123"}' -v
