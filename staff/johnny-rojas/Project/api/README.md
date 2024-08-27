##### Router

- Routes for User:
	- POST /users (Create user)
	- PATCH /users/:userId/manage (Update information user)
	- DELETE /users/:userId/manage(Soft delete for user)
	- POST /users/auth (Delete room)
	
- Routes for Room:
	- GET /rooms (Get Rooms)
	- POST /rooms (Create Room)
	- GET /rooms/:roomId (Get Room)
	- POST /users/:userId/rooms (Get all user Rooms)
	- PATCH /rooms/:roomId/manage (Update information rooms )
	- DELETE /rooms/:roomId/manage (Delete room)

- Routes for Room:
	- POST /create-booking/:roomId (Create Booking)
	- GET /create-booking/:roomId (Get blocked days by Room)
	- GET /bookings/:roomId (Get Room bookings)
	- DELETE /rooms/:roomId/manage/booking (Cancell Booking)
	
##### Test Coverage

![](./coverage/Screenshot%202024-08-26%20at%2013.21.23.png)

# Commands to initialize the application

### Install dependencies 

npm i

## Start the back
#### Start application

npm start

#### Start test server

npm test

#### Start coverage test server

npm run test-coverage

## Start debugger server
#### Debugger general back

npm run inpect

### Debugger test server

node --inspect-brk logic/(rute)

### Debugger test Mocha Chai

npm run test-inpect (rute)
