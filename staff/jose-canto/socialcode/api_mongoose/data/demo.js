import mongoose from "mongoose"


mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow')).catch(console.error)


// const User = mongoose.model("User", { name: String, surname: String, email: String, username: String, password: String })

// const pepito = new User({ name: "ojo", surname: "Nito", email: "ojo@email.es", username: "ojonito", password: { pasword: 1234 } })

// pepito.save().then(() => console.log("user insert")).catch(console.error)


const Post = mongoose.model("Post", { title: String, image: String, description: String, date: Date, author: String, likes: [String], comments: [{ author: String, text: String, date: Date }] })

const postPepito = new Post({ title: "Post nº1", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmJuYW9qZTJ2eXhheHZqdHo3N2J4N2ZhbjMyMGkxaGExeXplMnZiaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gw3IWyGkC0rsazTi/giphy.gif", description: "Test post", date: new Date, author: "ojonito", likes: ["pepitogrillo", "ojonito"], comments: [{ author: "pepitogrillo", text: "Hola comment", date: new Date }] })

postPepito.save().then(() => console.log("post inserted")).catch(console.error)