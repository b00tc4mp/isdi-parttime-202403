curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d '{
  "name": "Jorge",
  "artisticName": "Jorge Moreno",
  "speciality": "mago",
  "description": "mago de grandes ilusiones",
  "email": "jorge@moreno.com",
  "images": "http://",
  "video": "https://",
  "password": "123123123",
  "passwordRepeat": "123123123"
}' -v
name, artisticName, speciality, description, email, images, video, password, passwordRepeat