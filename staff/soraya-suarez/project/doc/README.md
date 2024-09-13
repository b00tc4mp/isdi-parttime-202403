# <span style="color:dodgerBlue;">DailyWork App</span>

## Application to manage the diferent tasks of a company and the management of its employees

## Functional

### Use Cases

User | Admin

- Manage tasks
  - Add task
  - Modify task
  - Delete task
  - Assign task
  - Choose Task
- View tasks
  - Available tasks
  - Private tasks
  - Completed tasks
- See all employees and only availables employees
  - Profile avatar
  - Email
  - Name
  - Surname
  - Phone number

Admin

- Enroll employee
- Unsubscribe employee

#### Version 0.1

User | Admin

- Sign in
- Sign out
- Edit profile
- Request vacation
- Request resignation
- Recover password

Admin

- View an employee's tasks
- View an employee's statistics
- Manage vacations
- Manage sick leave

### UI Design

[Figma prototype for Admin] https://www.figma.com/proto/ML5WwZsprS1luWh6XhCRPR/Daily-work?node-id=9-113&t=PTO82nbxySLVnhBm-1&scaling=min-zoom&content-scaling=fixed&page-id=9%3A100&starting-point-node-id=22%3A171

[[Figma prototype for User]] https://www.figma.com/proto/ML5WwZsprS1luWh6XhCRPR/Daily-work?node-id=27-628&t=3tySBs1qxCV8deSr-1

## Technical

### Data Model

#### User|Admin

- id (auto)
- name (string, required)
- surname (string, required)
- phone (string, optional)
- avatar (string, optional)
- email (string, unique, required)
- password (string, required, hashed)
- role (string, required, default user, enum: user|admin)
- available (boolean, default true)
- manager (User.id)

#### Task

- id (auto)
- creator (User.id, required)
- owner (User.id, default the creator)
- name (string, required)
- description (string, required)
- status (string, required, default toDo, enum: toDo|inProgress|finished|canceled)
- priority (string, required, default low, enum: low|medium|high)
- visible (boolean, required, default true)
- observations (string, optional)
- completionTime (number, required if state is finished)

## Technologies Used

- Frontend: React, Vite
- Backend: Node.js
- Testing: Mocha Chai

### Code Coverage

![alt text](coverage.png)
