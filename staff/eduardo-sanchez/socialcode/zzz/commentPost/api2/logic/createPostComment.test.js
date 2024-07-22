// import "dotenv/config"
// import mongoose from "mongoose"
// import createPostComment from './createPostComments.js'

// const { MONGODB_URL } = process.env

// mongoose.connect(MONGODB_URL)
//     .then(() => {
//         try {
//             createPostComment("6686aac02f7668c202a5f97f", "668d4687899458f8a1f7ffc8", "Comment Testing")
//                 .then(() => {
//                     console.log("Comment Created")
//                 })
//                 .catch(() => {
//                     console.error(error)
//                 })
//         } catch (error) {
//             console.error(error)
//         }
//     })
//     .catch(error => console.error(error))