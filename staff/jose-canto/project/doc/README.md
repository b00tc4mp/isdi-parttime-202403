# Cool Steps

An app for renting and lending ladders.

![](https://media.giphy.com/media/m9pvbkBJzOY9Mt0dSm/giphy.gif?cid=790b761118teuaz0ojtj0vsytuoevmgff91t460gpic3jk80&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

User | Admin | Root

- publish a ladder (for renting or selling)
- search ladders (with filter)
- rent a ladder (by day, period, ...)
- buy a ladder
- chat with ladder owner
- report a ladder owner
- see owner reviews (by rating)
- see ladder reviews (by rating)

Admin | Root

- list latest reportings (from users)
- view a report
- reply to a report
- deactivate a user
- ...

Root

- list admin users
- view admin user
- deactivate admin user
- register new admin user
- ...

### UI Design

[Figma](https://www.figma.com/design/FtmTtX9cZewWlv6yqsj4nu/demo-app?node-id=0-1&t=tNho9NZQl4l4RETJ-0)

## Technical

### Data Model

User

- id (auto)
- name (string, required)
- surname (string, required)
- email (string, required)
- password (string, required)
- role (string, required, default regular, enum: regular|admin|root)

Ladder

- id (auto)
- owner (User.id, required)
- title (string, required)
- description (string, required)
- type (string, required, default plain, enum: plain|angular|extensible|...|other)
- height (number, required)
- weight (number, required)
- maxLoad (number, required)
- age (number, required)
- material (string, required, enum: wood|aluminium|...|other)
- brand (string)
- model (string)
- price (number, required)
- kind (string, required, enum: renting|sale)
- address (string, required)

Deal

- id (auto)
- provider (User.id, required)
- customer (User.id, required)
- ladder (Ladder.id, required)
- type (string, required, enum: renting|sale)
- date (date, required)
- price (number, required)
- fromDate (date)
- toDate (date)
- deposit (number)

...
