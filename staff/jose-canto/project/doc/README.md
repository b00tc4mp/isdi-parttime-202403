# <span style="color:cyan;">FactuClient APP</span>

## Application to store completed work and generate client invoices

<img style="width:50%" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3R3MmRvcDR3Znd5N3RoczF4MjV1ZWJrc2t6Y2tuNWt6eWU0ZzV3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FAEEL82CUc1JPBas1V/giphy.webp" alt="Image Invoice" >

## <span style="color:cyan;">Functional</span>

### Use Cases

- Create user
  - Edit user profile
    - User logo.
    - Full name.
    - Company name.
    - Company address.
    - Tax identification number.
    - Email.
    - Phone number.
    - Bank account number.
  
- Add Clients / Delete Clients
  - Edit client profile.
    - Client logo.
    - Full name or company name.
    - Company address.
    - Tax identification number.
    - Email.
    - Phone number.

- List Clients
  - Access each client.
    - See all invoices
      - Share invoices.
    - See all delivery notes
      - Share delivery notes.

- Add work done for each client
  - Client data
    - Delivery note number.
    - Delivery note date.
    - Concept.
    - Quantity of work done.
    - Date of work performed.
    - Unit price.
    - Total price.
    - Customer signature.
  
- Generate invoice from work performed.
  - Select client to invoice.
  - Invoice date.
  - Invoice number.
  - Select billing period.
  - Generate invoice button
  - Share via email/Whatsapp PDF

### UX/UI Design

[Figma Design prototype](https://www.figma.com/proto/fxphzzY7aubtHDbX4zHKbf/Project?t=EH1h31BHQYbxyRVR-1)
![alt text](Figma-prototype-design.PNG)

## <span style="color:cyan;">Technical</span>

### Data Model

### User

- Id (auto)
- Full name (string, required)
- Company name (string, required)
- User address (string, required)
- Tax identification number (string, required)
- Email (string, required)
- Phone number (string, required)
- Bank account number (string, required)
- Company logo (optional)

### Client

- Id (auto)
- Client name (string, required)
- Tax identification number (string, required)
- Client address (string, required)
- Email (string, required)
- Phone number (string, required)

### Delivery Note

- Id (auto)
- Delivery Note Date (auto, string)
- Delivery Note Number (auto, string)
- Client name (string, auto)
- Tax identification number (string, auto)
- Client address (string, auto)
- Phone number (string, auto)
- Concept (string, required)
- Quantity (string, required)
- Price (number, required)
- Total Price (auto, number)
- Total Delivery Note (auto, number)
- Observations (string, optional)

### Invoice

#### Invoice Section

- Id (auto)
- Invoice Date (auto, string)
- Invoice Number (auto, string)
- Invoice Description (auto, string)
  - Delivery note date (auto, string)
  - Delivery note concept (auto, string)
  - Delivery note price (auto, number)
  - Total price (auto, number)
  - Total price + tax (auto, number)
  - Payment type (auto, string)

#### Client Section

- Client name (string, auto)
- Client tax identification number (string, auto)
- Client address (string, auto)
- Client phone number (string, auto)
- Client email (string, auto)

#### User Section

- User name (string, auto)
- User tax identification number (string, auto)
- User address (string, auto)
- User phone number (string, auto)
- User email (string, auto)
