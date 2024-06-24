import logic from "./index.js";

logic
  .authenticateUser("MrGreen", "123123123")
  .then(() => {
    console.log("user authenticated");
  })
  .catch((error) => {
    console.error(error);
  });
