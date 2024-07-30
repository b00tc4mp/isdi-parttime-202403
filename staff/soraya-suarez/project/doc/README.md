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
- View tasks
  - Available tasks
  - Private tasks
  - Completed tasks
- Edit profile
- See all employees and only availables employees
  - Profile avatar
  - Email
  - Name
  - Surname
  - Phone number

Admin

- View an employee's tasks
- Enroll employee
- Unsubscribe employee

#### Version 0.1

User | Admin

- Sign
- Request vacation
- Request resignation

Admin

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
- phoneNumber (number, optional)
- avatar (string)
- email (string, unique, required)
- password (string, required, hashed)
- role (string, required, default user, enum: user|admin)
- available (boolean, default true)
- tasks ([Task.id])

#### Task

- id (auto)
- name (string, required)
- description (string, required)
- state (string, required, default toDo, enum: toDo|inProgress|finished)
- priority (string, required, default low, enum: low|medium|high)
- owner (User.id, default the creator)
- completionTime (number, required if state is finished)
- visibility (boolean, default true)
- observations (string, optional)
- incidence (boolean, default false)
- vacation ([date])
