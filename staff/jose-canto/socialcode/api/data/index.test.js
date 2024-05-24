import data from "./index.js"

// data.findUser(user => user.name === "Luna", (error, user) => {
//   if (error) {

//     console.error(error)

//     return
//   }

//   console.log(user)
// })

// data.findUser((user) => {  mismo código de arriba de diferente forma
//   return user.surname === "Sparrow";
// }, (error, user) => {
//   if (error) {
//     console.error(error)

//     return
//   }

//   console.log(user)
// })


// ? ------------------------------------------------------------

// data.insertUser({ name: "Bruce", surname: "Wayne", email: "batman@email.es", username: "batman", password: "1234" }, (error) => {

//   if (error) {

//     console.error(error)
//   }

//   console.log("User inserted")
// })

//? ------------------------------------------------------

// data.findPosts(post => post.title && post.title.includes("TEST"), (error, posts) => {
//   if (error) {
//     console.error(error);
//     return;
//   }

//   console.log(posts);
// });

//? ------------------------------------------------------

// data.insertPost({ author: "pepito", title: "TEST", image: "image", description: "description", date: "date" }, (error) => {
//   if (error) {
//     console.error(error);
//     return;
//   }

//   console.log("Post inserted");
// })

//? ------------------------------------------------------

data.deletePost(post => post.date.includes("date"), (error) => {
  if (error) {
    console.error(error)
  }

  console.log("Post deleted")
})