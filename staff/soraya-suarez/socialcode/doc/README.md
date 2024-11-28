# SocialCode

## Functional

### Use Cases

User

- create post
- update post
- delete post
- list posts
- like post
- save post
- report post
- ...

Admin

- list reported posts
- block user
- delete user
- hide post
- message user
- delete post
- ...

### UIUX Design

[Figma](https://www.figma.com/design/K53SM09APOj1jrU12VYoE8/Untitled?node-id=0-1&t=5CwUXDBFdq2rw5RG-0)

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

- id (string)
- name (string)
- surname (string)
- email (string, unique)
- username (string, unique)
- password (string, hashed)

Post

- id (string)
- author (User.id)
- title (string)
- image (string)
- description (string)
- date (date)
