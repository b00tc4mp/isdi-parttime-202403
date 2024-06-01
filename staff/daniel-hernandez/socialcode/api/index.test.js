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
      "MrRed",
      "test post title",
      "https://picsum.photos/200/300",
      "test post",
    );
  } catch (error) {
    console.log(error);
  }
}

async function testDeletePost() {
  try {
    logic.deletePost("MrRed", "lwvg8vq4uvttq");
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

async function testGetUsersName() {
  try {
    const name = await logic.getUsersName("MrBlue", "someone");
    console.log(`users name retrieved: ${name}`);
  } catch (error) {
    console.log(error);
  }
}
