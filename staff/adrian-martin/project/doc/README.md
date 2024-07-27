# Gamehub

GameHub is an application designed for video game players. It allows you to create a custom list of your favorite games, where you can rate each title. Additionally, it has a section displaying the lists of all players, enabling you to view and rate the lists of others. Each player will have their own profile

## Application to store completed work and generate client invoices.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY241YWIzaHFuajRxaDBlN2trN3YzNDBjbzJyc2Uxc3Fuem0xYjNzcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/L8K62iTDkzGX6/giphy.gif)

## Functional

### Use Cases

User
- register user
- log in
- create game list
- view the game list
- edit the game list
- view others profiles
- view others game lists

### UI Design

[Figma](https://www.figma.com/design/GAs2cGmy06ZUkws4R8jZnI/Proyecto-Final?node-id=0-1&t=lpvyYDHEdKy8XEwY-1)

## Technical

### Data Model

#### User

- id (auto)                    identificador para cada usuario
- name (string, required)      nombre de usuario
- username (string, required)  nombre de usuario unico
- email (string, required)     direccion de correo electronico
- password(string, required)   contraseña del usuario

#### FileVideoGame

- id (auto)                              identificador unico para cada videojuego
- image_game (string)                    image del videojuego
- title_videoGame (string, required)     titulo del videojuego
- rating (integer, required)             nota asignada al videojuego por el usuario
- hours_in_the_game (integer, required)  cantidad de horas que el usuario ha jugado

#### GameList

- id (auto)                           identificador para cada entrada
- user_id (foreign key, required)     identificador del usuario que creó la entrada
- video_game_id                       identificador del videojuego que esta en la lista

#### Profile

- id (auto)                 identificador unico para cada perfil
- profile_picture (string)  image de perfil del usuario
- userId (foreign key)      identificador del usuario al que pertenece el perfil
- username (string, required): Nombre de usuario único.
- link_gamelist             url que redirige a la lista de jeugos del usuario del perfil
- Average_grade             nota media de la lista de juegos del usuario

#### PlayerFileList

- id (auto)                         identificador unico para cada tarjeta de cada jugador
- profile_picture (string)          image de perfil del usuario
- userId (foreign key)              identificador del usuario al que pertenece el perfil
- Average_grade(integer, required)  nota media de la lista de juegos del usuario

#### PlayerList

- id (auto)                        identificador para cada entrada
- userId (foreign key, required)  identificador de la ficha del usuario 


<!-- #### CreateFileVideoGame

- id (auto)
- title_videoGame (string, required)
- rating (integer, required)
- hours_in_the_game (integer, required) -->