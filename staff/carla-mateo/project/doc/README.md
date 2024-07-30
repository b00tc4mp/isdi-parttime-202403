
# <span style="color:green;">Family Sync</span>


An application to share tasks, calendar, shopping list and more, between members of the application.

![](https://media.gettyimages.com/id/912819544/es/vector/conjunto-de-iconos-de-e-commerce-de-dise%C3%B1o-plano-con-sombra-lateral.jpg?s=612x612&w=0&k=20&c=ZPsbHX-pmbOi61dCBtd80x5cXAh4VA0ml7krO1X9Onw=)

## <span style="color:green;">Functional</span>

### Use Case

Admin

- create group 
- choose the avatar
- create different prfoiles
- delete profiles
- delete group
- delete task
- delete events
- delete things to the shopping list


Admin | Profile

- create events in the calendar
- create check list
- check off the task
- add things to the shopping list


### UI Design

[Figma](https://www.figma.com/proto/5XWU1EnIKyi18M46iJRd96/Project?page-id=0%3A1&node-id=11-74&viewport=785%2C384%2C0.5&t=PaSZ4ZOTndgOqpHe-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=11%3A74)

## <span style="color:green;">Technical</span>

### Blocks

- App
- Api
- DB

### Modules

- app
- api
- com
- doc

### Data Model

Admin

- id (auto)
- name (string, require)
- username (string, require)
- email (string, require, unique)
- password (string, required, hashed)
- name home(string)
- avatar ([string])
- profile(string)


To do

- profile(string)
- description(string)
- check(string)

Shopping List

- title(string)

Event

- profile(string)
- title(string)
- date(Date)
