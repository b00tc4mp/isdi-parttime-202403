import data from "../data/data.js";
import {
  SystemError,
  ContentError,
  DuplicityError,
  MatchError,
} from "../errors/errors.js";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/;
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/;

const logic = {};

//TODO logic.isUserLoggedIn
//TODO logic.logoutUser
//TODO logic.getUsername && getUsersName

logic.getPosts = async () => {
  try {
    const posts = await data.getPosts();
    return posts.reverse();
  } catch (error) {
    throw new SystemError(`failed fetching posts: ${error.message}`);
  }
};

logic.getUsers = async () => {
  try {
    const users = await data.getUsers();
    return users;
  } catch (error) {
    throw new SystemError(`failed fetching users: ${error.message}`);
  }
};

logic.createPost = async (username, title, image, description) => {
  try {
    function generateId() {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substr(2, 5);
      return timestamp + random;
    }

    if (typeof title !== "string" || !title.length || title.length > 20) {
      throw new ContentError("Title is not valid.");
    }
    if (typeof image !== "string" || !image.startsWith("http")) {
      throw new ContentError("Image is not valid.");
    }
    if (
      typeof description !== "string" ||
      !description.length ||
      description.length > 200
    ) {
      throw new ContentError("Description is not valid.");
    }
    const user = await data.findUser((user) => user.username === username);
    if (!user) {
      throw new MatchError("user not found");
    }

    const post = {
      id: generateId(),
      author: username,
      title,
      image,
      description,
      date: new Date().toISOString(),
    };

    data.createPost(post);
  } catch (error) {
    throw new SystemError(`failed to create post: ${error.message}`);
  }
};

logic.createUser = async (
  name,
  surname,
  email,
  username,
  password,
  repeatedPassword,
) => {
  try {
    if (
      !name ||
      !surname ||
      !email ||
      !username ||
      !password ||
      !repeatedPassword
    ) {
      throw new ContentError("All fields are required");
    }

    // name regex
    if (!NAME_REGEX.test(name)) {
      throw new ContentError("Name is not valid");
    }

    // surname regex
    if (!NAME_REGEX.test(surname)) {
      throw new ContentError("Surname is not valid");
    }

    // email regex
    if (!EMAIL_REGEX.test(email)) {
      throw new ContentError("Email is not valid");
    }

    // username regex
    if (!USERNAME_REGEX.test(username)) {
      throw new ContentError("Username is not valid");
    }

    // password regex
    if (!PASSWORD_REGEX.test(password)) {
      throw new ContentError("Password is not valid");
    }

    // check password length
    if (password.length < 8) {
      throw new ContentError("Password should be at least 8 characters long");
    }

    // check if passwords match
    if (password !== repeatedPassword) {
      throw new MatchError("Passwords do not match");
    }

    // check if user exists
    const existingUser = await data.findUser(
      (user) => user.username === username,
    );
    if (existingUser) {
      throw new DuplicityError("Username already exists");
    }

    const userData = {
      name,
      surname,
      email,
      username,
      password,
    };

    await data.createUser(userData);
  } catch (error) {
    throw new SystemError(`failed to create user: ${error.message}`);
  }
};

logic.getUser = async (username) => {
  try {
    let user = await data.findUser((user) => user.username === username);
    if (!user) user = { 404: "user not found" };
    return user;
  } catch (error) {
    throw new SystemError(`failed to get user: ${error.message}`);
  }
};

logic.getPost = async (id) => {
  try {
    let post = await data.findPost((post) => post.id === id);
    if (!post) post = { 404: "post not found" };
    return post;
  } catch (error) {
    throw new SystemError(`failed to get post: ${error.message}`);
  }
};

logic.deletePost = async (id) => {
  try {
    await data.deletePost((post) => post.id === id);
  } catch (error) {
    throw new SystemError(`failed to delete post: ${error.message}`);
  }
};

logic.authenticateUser = async (username, password) => {
  try {
    if (!USERNAME_REGEX.test(username)) {
      throw new ContentError("username is not valid");
    }

    if (!PASSWORD_REGEX.test(password)) {
      throw new ContentError("password is not valid");
    }

    const user = await data.findUser((user) => user.username === username);
    if (!user) {
      throw new MatchError("user not found");
    }

    if (user.password !== password) {
      throw new MatchError("wrong password");
    }
  } catch (error) {
    throw new SystemError(`failed to authenticate user: ${error.message}`);
  }
};

export default logic;
