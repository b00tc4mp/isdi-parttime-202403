# DAILY PLANNER 📆

Daily Planner is an application designed for professionals who need to efficiently manage their appointment schedules. This tool not only allows you to schedule and organize appointments with clients but also maintain a detailed database of each one, including their history and specific treatments.

![Texto alternativo](../public/images/daily-planner-gif.webp)

## Functional

### Use Cases

Provider

- Create client
- Delete client
- Edit client
- Make an appointment
- Delete appointment
- Edit appointment
- Create service
- Delete service
- Edit service
- Send messages
- Create profile
- configure app
- Send mails (remainders, info, etc...)

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
- name (string)
- surname (string)
- email (string)
- password (string)
- role (string, enum: customer|provider)
- phone (string, optional)

Service

- id (auto)
- title (string)
- duration (number)
- price (number)
- description (string)
- provider (User.id)

Booking

- id (auto)
- service (Service.id)
- date (Date)
- user (User.id)

Provider

- id (auto)
- user (User.id)
- customers ([User.id])

Note

- id (auto)
- provider (User.id)
- customer (User.id)
- text (string)
