Router

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
	


	![](../api/coverage/Screenshot%202024-08-26%20at%2009.55.30.png)

