import { Schema, model, Types } from "mongoose"
const { ObjectId } = Types

const post = new Schema({
    // cambiamos el author a objeto con id de mongo
    author: {
        type: ObjectId,
        required: true,
        ref: "User" // que traiga todos los posts con todos la data de la coleccion users: (populate)
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now // cuando se cree un objeto de post insertara automaticamente la fecha actual
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    /*   coments: [{
          type: {
              author: {
                  type: String,
                  required: true
              },
              text: {
                  type: String,
                  required: true
              },
              date: {
                  type: Date,
                  required: true,
                  default: Date.now
              }
          }
      }] */
})

const Post = model("Post", post)

export default Post