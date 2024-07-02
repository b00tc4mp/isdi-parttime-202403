import data from "./index.js"


data.insertPost({ author: "pepito", title: "TEST", image: "image", description: "description", date: "date" }, (error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("Post inserted");
})
