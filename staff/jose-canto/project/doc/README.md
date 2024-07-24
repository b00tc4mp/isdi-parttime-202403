# <span style="color:cyan;">FactuClient APP</span>

## Application to store completed work and generate client invoices

<img style="width:50%" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3R3MmRvcDR3Znd5N3RoczF4MjV1ZWJrc2t6Y2tuNWt6eWU0ZzV3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FAEEL82CUc1JPBas1V/giphy.webp" >

## <span style="color:cyan;">Functional</span>

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

### UXUI Design

[Figma](https://www.figma.com/design/FtmTtX9cZewWlv6yqsj4nu/demo-app?node-id=0-1&t=tNho9NZQl4l4RETJ-0)

## <span style="color:cyan;">Technical</span>

### Data Model

### User

- id (auto)
- Full name
- Company name
- User address
- tax identification number
- Email
- Phone number
- Bank account number
- Company logo?

### Client

- id (auto)
- Client name
- tax identification number
- Client address
- Email

### Delivery Note


...
