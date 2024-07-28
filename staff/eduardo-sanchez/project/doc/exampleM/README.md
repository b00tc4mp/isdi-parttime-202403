# Cool Steps

Farm-Hub

An app for putting in contact sellers & buyers of farming products.

![](https://media.giphy.com/media/L0N18KIcj6Q1k1qawG/giphy.gif?cid=790b7611to347bowg1zej1c49sayiiv15oc2ld0f9xa767j3&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

SellerUser
- create post products to sell
- update post
- delete post
- search products
- create comments

BuyerUser
- search products
- see posts about products
- create comments

Admin | 
- list latest comments(from buyers & Users)
- view a comment
- reply to a comment
- deactivate a users (SellerUser | BuyerUser)

### UI Design

[Figma](https://www.figma.com/design/mestlo3h1KAcMCOMNI5L0T/APP?node-id=0-1&t=Efvnu97s1AQavJi9-0)

## Technical

### Data Model

SellerUser
- id (auto)
- name (string)
- surname (string)
- email (string)
- password (string)

Post
- id (auto)
- author (SellerUser.id)
- title (string)
- description (string)
- contact info (string)
- date (date)

BuyerUser
- id (auto)
- name (string)
- surname (string)
- email (string)
- password (string)

### Blocks

- API
- APP
- DB

### Modules

- api
- app
- com
- doc

