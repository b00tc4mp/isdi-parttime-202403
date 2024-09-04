### IZI 🇻🇪🧳

This app is a PMS (Property Managment System) oriented for hotels and lodges in Venezuela to improve the reservation service and management of the same. 

![](https://media.giphy.com/media/MvcSVgUqz1yuBQktVr/giphy.gif?cid=790b7611w4tqrdwlo5cni3on5242389ega8jif7s67uszv8h&ep=v1_gifs_search&rid=giphy.gif&ct=g)


(The suitcases are not for leaving, they are for getting to know)

## Functional

[Figma](https://www.figma.com/design/mGgjsZVlyCzTjD2F2D2raf/Proyecto?node-id=71-296&t=xK8ikqw2vsMB0RhA-1)

### Use Cases
 Host 

The Host is the person who manages the hosting. This profile has full access to the system and can perform the following actions:

- Room Management:
	- Create Room: Add new rooms with details, type (single, double, suite), price per night and location for state and city.
	- Read Room: View the list of all rooms and their details.
	- Update Room: Edit the details of existing rooms.
	- Delete Room: Delete rooms that are no longer available.

- Reservation Management:
  - View Reservations: View the list of all reservations made.
  - Cancel Reservations: Cancel reservations if necessary.

- User Management:
	- Manage Customer Profiles: View and modify basic customer contact information if necessary.

Guest

The Guest is the user who searches for and books accommodation. This profile has access to the following functionalities:

- Browse and Search Rooms:
	- View Room Details: View detailed information about available rooms, including photo, descriptions, prices and location.
- Make Reservations:
	- Create Reservation: Make reservations by selecting dates of stay.
	- View Reservations: View a list of your past and future reservations.
- User Profile:
	- View and Edit Profile: Access and update your personal information, such email address and phone number.
	- Booking History: View a history of all bookings made in the past.


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

## Test-Coverage
![](../api/coverage/Screenshot%202024-08-28%20at%2016.43.37.png)