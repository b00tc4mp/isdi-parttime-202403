import mongoose, { model } from "mongoose"
import { User, Post } from "./index.js"

/* 

---> EJEMPLO
//const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });

kitty.save()
    .then(() => console.log('meow'))
    .catch(console.error);
const User = mongoose.model("User", user)

const user = new Schema({ name: String })

 */

mongoose.connect("mongodb://localhost:27017/test")
    .then(() => {
        // User.create({ email: "mongoose@gmail.com", username: "mongoose", password: "1234" })
        //     .then(() => console.log("created"))
        //     .catch(error => console.error(error))

        // Post.create({ author: "mongo", title: "mongooseTest", image: "http:nose", description: "blah" })
        //     .then(() => console.log("created"))
        //     .catch(error => console.error(error))

        Post.find({}).populate("author", "username") // te permite traerte informacion del usuario y seleccionar los campos. 
            //Populate sabe que tiene que ir a buscar la data a Users y lo copia en author
            .then((posts) => console.log("retrieved", posts))
            .catch(error => console.error(error))
    })

    .catch(error => console.error(error))
