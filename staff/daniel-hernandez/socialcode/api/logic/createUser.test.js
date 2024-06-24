import logic from "./index.js";

logic
  .createUser(
    "Mr",
    "Green",
    "mr@green.com",
    "MrGreen",
    "123123123",
    "123123123",
  )
  .then(() => {
    console.log("user created");
  })
  .catch((error) => {
    console.error(error);
  });
