import data from "./index.js"

data.findPosts(post => post.title && post.title.includes("L"), (error, posts) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(posts);
});
