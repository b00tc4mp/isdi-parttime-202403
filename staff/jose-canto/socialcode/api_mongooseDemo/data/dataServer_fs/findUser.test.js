import data from "./index.js"

data.findUser(user => user.name === "Luna", (error, user) => {
  if (error) {

    console.error(error)

    return
  }

  console.log(user)
})

