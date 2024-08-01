# Farm-Hub

An app for putting in contact sellers & buyers of farming products.

![](https://media.giphy.com/media/L0N18KIcj6Q1k1qawG/giphy.gif?cid=790b7611to347bowg1zej1c49sayiiv15oc2ld0f9xa767j3&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

User
- create ad of product/s to sell
- update previously created ad
- delete previously created ad
- search products by name/geo, etc
- see ads about products around you

#### Version 0.1

User
- create comment in ad
- delete comment created in ad

Admin
- list latest comments(from Users)
- view a comment
- reply to a comment
- deactivate a users 

### UI Design

[Figma](https://www.figma.com/design/mestlo3h1KAcMCOMNI5L0T/APP?node-id=0-1&t=Efvnu97s1AQavJi9-0)

## Technical

### Blocks

- App
- API
- DB

### Modules

- app
- api
- com
- doc

### Data Model

User
- id (auto)
- name (string)
- surname (string)
- email (string)
- password (string)
- phone (string)
- address (string)
- location (Point)

Point
- id(auto)
- type(string, enum ['Point'], required)
- coordinates ([Number], required)


Ad
- id (auto)
- author (User.id)
- title (string)
- description (string)
- date (date)

##### Version 0.1

User
- role (admin, string)


