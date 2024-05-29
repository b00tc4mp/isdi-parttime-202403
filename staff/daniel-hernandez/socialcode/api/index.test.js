// import data from "./data/data.js";
import logic from "./logic/logic.js";

async function testFindUser() {
  try {
    const user = await data.findUser((user) => user.surname === "Pan");
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

async function testCreateUser() {
  try {
    await logic.createUser(
      "Mr",
      "Blue",
      "mrblue@email.com",
      "MrBlue",
      "123123123",
      "123123123",
    );
  } catch (error) {
    console.log(error);
  }
}

async function testFindPost() {
  try {
    const post = await data.findPost(
      (post) => post.id === "1716319512771-8375259641077482",
    );
    console.log(post);
  } catch (error) {
    console.log(error);
  }
}

async function testCreatePost() {
  try {
    await logic.createPost(
      "MrBlue",
      "Hello World",
      "https://miro.medium.com/v2/resize:fit:1024/1*OohqW5DGh9CQS4hLY5FXzA.png",
      "console.log('HelloWorld')",
    );
  } catch (error) {
    console.log(error);
  }
}

async function testDeletePost() {
  try {
    await data.deletePost(
      (post) => post.id === "1716319512771-8375259641077482",
    );
  } catch (error) {
    console.log(error);
  }
}

async function testGetPosts() {
  try {
    const posts = await logic.getPosts();
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
}

async function testGetUsers() {
  try {
    const users = await data.getUsers();
    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

async function testAuthenticateUser() {
  try {
    await logic.authenticateUser("MrBlue", "123123123");
  } catch (error) {
    console.log(error);
  }
}
