# Gamehub

GameHub is an application designed for video game players. It allows you to create a custom list of your favorite games, where you can rate each title. Additionally, it has a section displaying the lists of all players. Each player will have their own profile.

We will gradually implement more features into the app.

![alt text](image-2.png)

## Functional

### Use Cases

User
- register user
- log in
- implement game in your gameList
- edit the games
- delete the games
- view the game list
- edit the game list
- view others profiles
- view others game lists

### UI Design

[Figma](https://www.figma.com/design/GAs2cGmy06ZUkws4R8jZnI/Proyecto-Final?node-id=0-1&t=lpvyYDHEdKy8XEwY-1)

## Technical

### Data Model

#### User

- id (auto)                    
- name (string, required)      
- username (string, required)  
- email (string, required)     
- password(string, required)

( profilePicture (string) Vs 2.0 ) 
( gameList (game.id)      Vs 2.0 )



#### Game

- id (auto)                              
- author (user.id)                                
- title (string, required)      
- image (string, required)           
- rating (number, required)               
- hours (number, required)    

## Technologies Used

- Frontend: React, Vite
- Backend: Nodejs
- Testing: Mocha Chai

## Code Coverage

![alt text](image.png)