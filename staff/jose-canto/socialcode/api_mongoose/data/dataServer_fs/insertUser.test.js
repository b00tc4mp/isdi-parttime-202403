import data from "./index.js"

data.insertUser({ name: "Bruce", surname: "Wayne", email: "batman@email.es", username: "batman", password: "1234" }, (error) => {

  if (error) {

    console.error(error)
  }

  console.log("User inserted")
})
