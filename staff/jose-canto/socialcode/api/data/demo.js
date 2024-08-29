import mongoose from "mongoose"
import { User, Post } from "./index.js"



mongoose.connect("mongodb://localhost:27017/socialcode")
  .then(() => {
    // User.create({ name: "Super", surname: "Woman", email: "super@woman.com", username: "superwoman", password: "1234" })
    //   .then(() => console.log("created"))
    //   .catch((error) => console.log(error))

    // Post.create({ author: "pepitogrillo", title: "console.log", image: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif?cid=790b761141n7loufwnbwnths7yjfblv4uk58m6sxya3kjvbg&ep=v1_gifs_search&rid=giphy.gif&ct=g", description: "...", })

    Post.findOne({}).populate("author", "username")
      .then((posts) => console.log("retrieved", posts))
      .catch((error) => console.log(error))
  })
  .catch(error => console.error(error))


