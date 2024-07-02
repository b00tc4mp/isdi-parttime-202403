import mongoose from "mongoose"


mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow')).catch(console.error)


const User = mongoose.model("User", { name: String, surname: String, email: String, username: String, password: String })

const pepito = new User({ name: "ojo", surname: "Nito", email: "ojo@email.es", username: "ojonito", password: { pasword: 1234 } })

pepito.save().then(() => console.log("user insert")).catch(console.error)