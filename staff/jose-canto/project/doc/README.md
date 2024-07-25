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
  - Share email/Whatsapp pdf

### UXUI Design

[Figma Design prototype](https://www.figma.com/proto/fxphzzY7aubtHDbX4zHKbf/Project?t=EH1h31BHQYbxyRVR-1)
![alt text](Figma-prototype-design.PNG)

## <span style="color:cyan;">Technical</span>

### Data Model

### User

- Id (auto)
- Full name (string, required)
- Company name(string, required)
- User address(string, required)
- tax identification number(string, required)
- Email(string, required)
- Phone number(string, required)
- Bank account number(string, required)
- Company logo?

### Client

- Id (auto)
- Client name (string, required)
- tax identification number (string, required)
- Client address (string, required)
- Email (string, required)
- Phone number(string, required)

### Delivery Note

- Id (auto)
- Deilvery Note Date(auto,string)
- Delivery Note Number (auto, string)
- Client name (string, auto)
- tax identification number (string, auto)
- Client address (string, auto)
- Phone number(string, auto)
- Concept (string, required)
- Quantity (string, required)
- Price (number, required)
- Total Price (auto, number)
- Total Delivery Note (auto, number)
- Observations(string)

### Invoice

- Invoice Section
  - Id(auto)
  - Invoice Date (auto, string)
  - Invoice Number (auto, string)
  - Invoice Description: (auto, string)
    - Date delivery note(auto, string)
    - Concept delivery note (auto, string)
    - Price concept deilvery note (auto, number)
    - Total Price (auto, number)
    - Total price + tax(auto, number)
    - Payment type(auto), string

- Client Section
  - Client name (string, auto)
  - Client tax identification number (string, auto)
  - Client address (string, auto)
  - Client Phone number(string, auto)
  - Client Email (string, auto)

- User Section
  - User Name (string, auto)
  - User tax identification number(string, auto)
  - User adress (string, auto)
  - User Phone number(string, auto)
  - User Email (string, auto)
  