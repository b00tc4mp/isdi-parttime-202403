import { Schema, model } from "mongoose"

const user = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }

})//propiedad unica para mongoose (como indice en mongo), forzara un indice para cada propiedad

const User = model("User", user)

export default User

/* 
export {
    User,
    Post
} */