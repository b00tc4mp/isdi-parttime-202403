# Level Up

Level Up allows users to generate and customize workouts, track personal bests and calculate performance metrics. Users can save workouts  and interact with their fitness community.

![](https://media.giphy.com/media/w7kBbAW9yrOG2Fni9R/giphy.gif?cid=790b7611608r7er4qfhmfkab26oqm779sm589ngws89in2zz&ep=v1_gifs_search&rid=giphy.gif&ct=g)



## Functional

### Use Cases

**User**
- **Profile**
    - Edit personal information
    - Add photo/avatar
    - Modify username
    - Add optional personal data (gender, weight, age)
- **Feed**
    - Share workouts and achievements
    - Like and comment on posts
    - View friends' shared workouts and achievements
- **Workout**
    - Generate random workouts
    - Customize workouts
    - Save workouts with results
    - Optionally share workouts on the feed
- **Achievements**
    - **Activity**: View all recorded workouts
    - **Analytics**: Calculate and estimate weights and repetitions based on personal bests


- Add friends to circle ??
- View friends' profiles??


### UIUX Design

[Figma](https://www.figma.com/proto/iqaqS1n2OJgojcYrg6usIA/LEVEL-UP?page-id=0%3A1&node-id=1-2&viewport=439%2C526%2C0.37&t=ZmB9SD7AMSpINv7N-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2)

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

**User**
- id (string)
- name (string)
- surname (string)
- email (string, unique)
- username (string, unique)
- photo or avatar (string, optional)
- gender (string, optional)
- weight (string, optional)
- age (string, optional) or (date, optional) ??
- friends (list of User.id)

**Post**
- id (string)
- author (User.id)
- image (string,optional)
- description/WOD/Movement (string)
- result (string)
- date (date)
- likes (list of User.id)
- comments (list of Comment.id)

**Workout**
- id (string)
- type (string)
- exercises (list of Movement.id)
- date (date)
- description (string)
- result (string)
- SHARE // SAVE ?? (boolean)

**Movements**
- id (string)
- name (string)
- weight (number)
- repetitions (number)
- date (date)

**Activity**


**Anlytics**
- exercises (list of Movement.id)
    - reps and weights (1RM, 2RM..) 
    - percentage and weights (85%, 90%..) 




