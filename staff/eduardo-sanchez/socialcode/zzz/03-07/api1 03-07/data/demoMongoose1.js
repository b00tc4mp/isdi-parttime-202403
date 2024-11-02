import mongoose from 'mongoose';

// const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow')).catch(error => console.error(error));

// or kitty.save().then(() => console.log('meow')).catch(console.error);

const User = mongoose.model('User', { name: String, surname: String, email: String, username: String, password: String });

const user = new User({ name: 'Lucas', surname: 'Perez', email: 'lucas@perez.com', username: 'lucasperez', password: '234234234' });

user.save().then(() => console.log('user inserted')).catch(console.error);


// const pepito = new User({ name: "ojo", surname: "Nito", email: "ojo@email.es", username: "ojonito", password: { pasword: 1234 } })

// pepito.save().then(() => console.log("user insert")).catch(console.error)
