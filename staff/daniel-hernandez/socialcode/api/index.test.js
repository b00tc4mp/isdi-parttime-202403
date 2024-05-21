import data from "./data/data.js";

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
    const newuser = await data.createUser({
      name: "Mr",
      surname: "Blue",
      email: "Mr@Blue.com",
      username: "MrBlue",
      password: "123412342134",
    });
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
    const newPost = await data.createPost({
      id: "1716319512771-8375259641077482",
      author: "nill",
      title: "null",
      image: ".img",
      description: "null",
      date: "null",
    });
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
    const posts = await data.getPosts();
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

testGetPosts();
