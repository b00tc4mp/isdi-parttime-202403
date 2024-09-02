curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d '{
  "name": "Juan",
  "artisticName": "Juan Tamariz",
  "discipline": "mago",
  "description": "mago de cerca",
  "city": "Barcelona",
  "email": "juan@tamariz.com",
  "image": "http://",
  "video": "https://",
  "password": "123123123",
  "passwordRepeat": "123123123"
}' -v
# name, artisticName, speciality, description, email, image, video, password, passwordRepeat