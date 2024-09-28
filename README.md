Test specs for logics in Backend

https://github.com/user-attachments/assets/e7a21cf4-6048-4999-9d8f-9467e424a424

# Farm-Hub

An awesome app for putting in contact sellers & buyers of farming products mostly in rural areas. Platform developed with React with the main objective of putting in touch sellers and buyers of farm products. The app allows user to search products withing a 50km radious.

![](https://media.giphy.com/media/L0N18KIcj6Q1k1qawG/giphy.gif?cid=790b7611to347bowg1zej1c49sayiiv15oc2ld0f9xa767j3&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Technologies used

## Functional

### Use Cases

User

- create ad of product/s to sell
- update previously created ad
- delete previously created ad
- search products by name & distance(50km)
- see ads about products around you(50Km)
- add coomments to ads
- delete own comments
- see ad approximate location on a map

#### Version 0.2

User

- update own comment in ad
- respond to other users' comments
- modify distance radious to search products
- create favourites & ratings for users/products

(V-0.2) add Admin role

- list latest comments(from Users)
- view comments
- reply to a comment
- deactivate a users
- manage disagreements between buyers & sellers
- add backoffice to visualize all data application

### UI Design

[Figma](https://www.figma.com/design/mestlo3h1KAcMCOMNI5L0T/APP?node-id=0-1&t=Efvnu97s1AQavJi9-0)

## Technical

### Blocks

- App
- API
- DB

### Modules

- Frontend
- Backend
- com
- doc

### Data Model

User

- id (auto)
- name (string)
- surname (string)
- email (string)
- password (string)
- contactInfo(string)
- userLocation ({lat, lng})

Ad

- id (auto)
- author (User.id)
- title (string)
- description (string)
- price(string)
- date (date)
- adcomments([])
- geolocation({lat, lng})

##### Version 0.2

User

- role (admin, string)
