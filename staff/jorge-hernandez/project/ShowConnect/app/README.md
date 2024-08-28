# ShowConnect

## Descripción

La aplicación ShowConnect es una plataforma que permite a artistas de diversos campos ofrecer sus servicios y a clientes buscar artistas en su comunidad autónoma. Ya sea que estés buscando un músico para un evento, un pintor para un mural o un actor para una obra de teatro, esta aplicación te conecta con ese talento que buscas.

- Registro de artistas: Los artistas pueden registrarse en la plataforma y crear perfiles detallados que muestren su trabajo, habilidades y experiencia.
- Búsqueda por comunidad autónoma: Los clientes pueden buscar artistas específicamente en su comunidad autónoma.
- Mensajería integrada: Los usuarios pueden comunicarse directamente con los artistas a través de un sistema de mensajería interno para discutir detalles y hacer arreglos.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/XWKrUYz1N5J7i/giphy.gif?cid=ecf05e47vrluquvgelor4hj0w7g0l7jh6vx3497ugu2j1ffe&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="GIF">
</div>

<!-- ![](https://media.giphy.com/media/XWKrUYz1N5J7i/giphy.gif?cid=ecf05e47vrluquvgelor4hj0w7g0l7jh6vx3497ugu2j1ffe&ep=v1_gifs_search&rid=giphy.gif&ct=g) -->

## Functional

### Uses cases

Artist

- Edit profile
- view messages
- reply to message
- view events
- add event
- edit event
- delete event

Client

- Search artists(by discipline and city)
- View artist details (profile and events)
- Send message to artist

#### version 0.1

Artist

- add review on artist
- report review

Admin

- view reports
- delete review

### UI design

#### Search for Artists by Autonomous Community

Search Filters:

- Type of Artist: [Musicians, Painters, Magicians, etc.]
- Event City
- Event Date

Search Results:

- Artist Name
- Specialty
- Experience: [Artist's Experience Description]
- Image
- Contact Button
- Average Rating

## Technical

### Modelo de datos

User

- id (auto)
- name (string, required)
- email (string, required)
- password(string, required)
- role(string, enum: artist | client)

Artist

- id (auto)
- user (User.id)
- artisticName (string, required)
- city (string, required)
- discipline (string, required)
- image (string, required)
- description (string, required)
- video (string, optional)

Chat

- id (auto)
- users([User.id])
- messages([Message])

Message

- id (auto)
- sender (User.id)
- text (string)
- date (Date)
