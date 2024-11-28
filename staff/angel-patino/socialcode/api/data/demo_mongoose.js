// import mongoose from 'mongoose'
// mongoose.connect('mongodb://127.0.0.1:27017/test')

// const User = mongoose.model("User", { name: String, surname: String, email: String, username: String, password: String })

// const pepito = new User({ name: "Depor", surname: "Tivo", email: "depor@tivo.com", username: "deportivo", password: { password: 123 } })
// pepito.save().then(() => console.log("user insert")).catch(console.error)

import mongoose from "mongoose"

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        User.create({ name: 'Super', surname: 'Woman', email: 'super@woman.com', username: 'superwoman', password: '123123123' })
            .then(() => console.log('created'))
            .catch(error => console.error(error))

        Post.create({ author: 'pepon', title: 'comedoritos', image: 'https.//loquesea.com', description: '...' })
            .then(() => console.log('created'))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))