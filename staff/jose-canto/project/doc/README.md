# FactuClient APP

## Application to store completed work and generate client invoices.

![](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3R3MmRvcDR3Znd5N3RoczF4MjV1ZWJrc2t6Y2tuNWt6eWU0ZzV3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FAEEL82CUc1JPBas1V/giphy.webp)

## Functional

### Use Cases

- Crate user
  - Edit user profile
    - user logo.
    - full name.
    - company name.
    - company adress.
    - tax identification number.
    - email.
    - phone number.
    - bank account number.
  
- Add Clients / Delete Clients
  - Edit client profile.
    - client logo.
    - full name or company name.
    - company adress.
    - tax identification number.
    - email.
    - phone number.

- List Clients
  - Access each client.
    - See all invoices
      - Share invoices.
    - See all delivery notes
      - Share delivery notes.

- Add work done for each client
  - Client data
    - number delivery note.
    - delivery note date.
    - concept.
    - quantity of work done.
    - date of work performed.
    - unit price.
    - total price.
    - customer signature.
  
- Generate invoice from work performed.
  - Select client to invoice.
  - Invoice date.
  - Invoice number.
  - Select Billing period.
  - Generate invoice button

### UI Design

[Figma](https://www.figma.com/design/FtmTtX9cZewWlv6yqsj4nu/demo-app?node-id=0-1&t=tNho9NZQl4l4RETJ-0)

## Technical

### Data Model

User

- id (auto)
- name (string, required)
- surname (string, required)
- email (string, required)
- password (string, required)
- role (string, required, default regular, enum: regular|admin|root)

Ladder

- id (auto)
- owner (User.id, required)
- title (string, required)
- description (string, required)
- type (string, required, default plain, enum: plain|angular|extensible|...|other)
- height (number, required)
- weight (number, required)
- maxLoad (number, required)
- age (number, required)
- material (string, required, enum: wood|aluminium|...|other)
- brand (string)
- model (string)
- price (number, required)
- kind (string, required, enum: renting|sale)
- address (string, required)

Deal

- id (auto)
- provider (User.id, required)
- customer (User.id, required)
- ladder (Ladder.id, required)
- type (string, required, enum: renting|sale)
- date (date, required)
- price (number, required)
- fromDate (date)
- toDate (date)
- deposit (number)

...
