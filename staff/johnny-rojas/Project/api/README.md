##### Router

- Routes for Users:
	- POST /users (Create user)
	- PATCH /users/:userId/manage (Update information user)
	- DELETE /users/:userId/manage(Soft delete for user)
	- POST /users/auth (Delete room)
	
- Routes for Rooms:
	- GET /rooms (Get Rooms)
	- POST /rooms (Create Room)
	- GET /rooms/:roomId (Get Room)
	- POST /users/:userId/rooms (Get all user Rooms)
	- PATCH /rooms/:roomId/manage (Update information rooms )
	- DELETE /rooms/:roomId/manage (Delete room)

- Routes for Bookings:
	- POST /create-booking/:roomId (Create Booking)
	- GET /create-booking/:roomId (Get blocked days by Room)
	- GET /bookings/:roomId (Get Room bookings)
	- DELETE /rooms/:roomId/manage/booking (Cancell Booking)
	
##### Test Coverage

![](./coverage/Screenshot%202024-08-28%20at%2016.43.37.png)

  ### Data Model

- Users:
  - id (objectId, auto)
  - name (string, required)
  - surname (string, required)
  - email (string, required, email) 
  - phone (number, required)
  - password (string, required, password)
  - role (string, required, default guest, enum: guest|host)
  - isBlocked (boolen, default false)

- Rooms:
  - id: (objectId, auto)
  - nameRoom: (string, requerido)
  - region: (string, requerido)
  - city: (array, requerido)
  - image: (string, requerido)
  - description: (string, requerido)
  - price: (string, requerido)
  - manager: (objectId, requerido, Ref: User)
  - isBlocked: (boolean, default: false)


- Bookings:
	- id (objectId, auto)
	- userId (string, required, array)
	- roomId (string, required)
	- startDate (date, required)
	- endDate (date. required)
	- isBlocked (boolean, default:false)



