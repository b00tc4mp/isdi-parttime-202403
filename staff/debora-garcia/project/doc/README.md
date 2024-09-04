# Level Up

Level Up allows users to generate and customize workouts, track personal bests and calculate performance metrics. Users can save workouts and interact with their fitness community.

![](https://media.giphy.com/media/w7kBbAW9yrOG2Fni9R/giphy.gif?cid=790b7611608r7er4qfhmfkab26oqm779sm589ngws89in2zz&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

**User**

- View workout results
- Toggle like workout post
- View wod result coments
- Add comment to workout post
- Delete wod result
- Get random workout
- Share workout result
- Edit wod result
  - Time
  - Repetitions
  - Weight
- Filter wod results by workout type
- View own wod results

**v0.1**

- **Profile**

  - Edit personal information
  - Add photo/avatar
  - Modify username
  - Add optional personal data (gender, weight, age)

- **Achievements**

  - Activity: View all recorded workouts
  - Analytics: Calculate and estimate weights and repetitions based on personal bests


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
- password (string, unique)

**Post**

- id (string)
- author (User.id)
- image (string,optional)
- workout (Workout.id)
- result (Result.id)
- date (date)
- likes ([User.id])

**Comment**

- id
- author (User.id)
- post (Post.id)
- text (string,required)
- date (date)

**Result**

- id (string)
- workout (Workout.id)
- athlete (User.id)
- time (number, optional)
- repetitions (number, optional)
- weight (number, optional)

**Workout**

- id (string)
- workoutType (string, enum: emom|amrap|for-time|benchmark)
- title (string, optional)
- movements ([Movement.id])
- rounds (number, optional)
- duration (number, optional)
- description (string, optional)

**Movement**

- id (string)
- name (string,required)
- weight (number, optional)
- quantity (number, required)
- units (string, optional)

**v0.1**

**Activity**

**Anlytics**

- exercises (list of Movement.id)
  - reps and weights (1RM, 2RM..)
  - percentage and weights (85%, 90%..)
  - photo or avatar (string, optional)

**Profile**

- gender (string, optional)
- weight (string, optional)
- age (date, optional)
- friends ([User.id])


### Test Coverage

![](../api/coverage/screenshot-29.08.24.png)