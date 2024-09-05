import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/test');

// const User = mongoose.model('User', { name: String, surname: String, email: String, username: String, password: String });

// const user = new User({ name: 'Lucas', surname: 'Perez', email: 'lucas@perez.com', username: 'lucasperez', password: '234234234' });

// user.save().then(() => console.log('user inserted')).catch(console.error);

const Post = mongoose.model("Post", { title: String, image: String, description: String, date: Date, author: String, likes: [String], comments: [{ author: String, text: String, date: Date }] })

const postUser = new Post({ title: "Post nº1", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmJuYW9qZTJ2eXhheHZqdHo3N2J4N2ZhbjMyMGkxaGExeXplMnZiaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gw3IWyGkC0rsazTi/giphy.gif", description: "Test post", date: new Date, author: "lucasperez", likes: ["pepolo", "ramonin"], comments: [{ author: "dana", text: "Hola comment", date: new Date }] })

postUser.save().then(() => console.log("post inserted")).catch(console.error)
