# <span style="color:dodgerBlue;">DailyWork App</span>

## Application to manage the diferent tasks of a company and the management of its employees

## Functional

### Use Cases

#### User | Admin

- Manage tasks
  - Add task
  - Modify task
  - Delete task
  - Assign task
- View tasks
  - Available tasks
  - Private tasks
  - Completed tasks
- Sign
- Edit profile
- Request vacation
- Request resignation
- See all employees and availables
  - Profile picture
  - Email
  - Name
  - Surname

#### Admin

- Manage tasks
  - Add task
  - Modify task
  - Delete task
  - Assign task
- View tasks
  - Available tasks
  - Private tasks
  - Completed tasks
- Sign
- Edit profile
- Request vacation
- Request resignation
- See all employees and availables
  - Profile picture
  - Email
  - Name
  - Surname
  - Statistics
  - Tasks
- Enroll employee
- Manage vacations
- Manage sick leave
- Unsubscribe employee

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
- email (string, required)
- password (string, required)
- role (string, required, default regular, enum: regular|admin)
- available (boolean, required, default true)
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
