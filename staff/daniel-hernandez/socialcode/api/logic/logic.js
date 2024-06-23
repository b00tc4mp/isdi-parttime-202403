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
const ID_REGEX = /^[a-z0-9]+[a-z0-9]{5}$/;

const logic = {};

logic.getPosts = (username) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("username is not valid");
  }

  return (async () => {
    let user, posts;

    try {
      user = data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to get posts: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      posts = await data.getPosts();
    } catch (error) {
      throw new SystemError(`failed fetching posts: ${error.message}`);
    }

    return posts.reverse();
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return data.getPosts();
    })
    .then((posts) => {
      return posts.reverse();
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      } else {
        throw new SystemError(`failed fetching posts: ${error.message}`);
      }
    }); */
};

// NOTE: unused
logic.getUsers = /* async */ () => {
  /* try {
    const users = await data.getUsers();
    return users;
  } catch (error) {
    throw new SystemError(`failed fetching users: ${error.message}`);
  } */

  return (async () => {
    let users;

    try {
      users = await data.getUsers();
    } catch (error) {
      throw new SystemError(`failed fetching users: ${error.message}`);
    }

    return users;
  })();

  /* return data.getUsers().catch((error) => {
    throw new SystemError(`failed fetching users: ${error.message}`);
  }); */
};

logic.createPost = (username, title, image, description) => {
  function generateId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
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

  return (async () => {
    let user;

    try {
      user = await data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to create post: ${error.message}`);
    }

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

    try {
      await data.createPost(post);
    } catch (error) {
      throw new SystemError(`failed to create post: ${error.message}`);
    }
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((user) => {
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

      return data.createPost(post);
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      } else {
        throw new SystemError(`failed to create post ${error.message}`);
      }
    }); */
};

logic.createUser = (
  name,
  surname,
  email,
  username,
  password,
  repeatedPassword,
) => {
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

  return (async () => {
    let existingUser;

    // check if user exists
    try {
      existingUser = await data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to create user: ${error.message}`);
    }

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

    try {
      await data.createUser(userData);
    } catch (error) {
      throw new SystemError(`failed to create user: ${error.message}`);
    }
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((existingUser) => {
      if (existingUser) {
        throw new DuplicityError("username already exists");
      }

      const userData = {
        name,
        surname,
        email,
        username,
        password,
      };

      return data.createUser(userData);
    })
    .catch((error) => {
      if (error instanceof DuplicityError) {
        throw error;
      } else {
        throw new SystemError(`failed to create user: ${error.message}`);
      }
    }); */
};

logic.getUser = (username) => {
  return (async () => {
    let user;

    try {
      user = await data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to get user: ${error.message}`);
    }

    if (!user) throw new MatchError("user not found");

    return user;
  })();

  /* return data
    .findUser((user) => user.username === username)
    .catch((error) => {
      throw new SystemError(`failed to get user: ${error.message}`);
    })
    .then((user) => {
      if (!user) throw new MatchError("user not found");

      return user;
    }); */
};

logic.getUsersName = (username, targetUsername) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("Username is not valid");
  }
  if (!USERNAME_REGEX.test(targetUsername)) {
    throw new ContentError("target username is not valid");
  }

  return (async () => {
    let user, targetUser;

    try {
      user = await data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!user) throw new MatchError("user not found");

    try {
      targetUser = await data.findUser(
        (user) => user.username === targetUsername,
      );
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!targetUser) throw new MatchError("target user was not found");

    return targetUser.name;
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((user) => {
      if (!user) throw new MatchError("user not found");

      return data.findUser((user) => user.username === targetUsername);
    })
    .then((targetUser) => {
      if (!targetUser) throw new MatchError("target user was not found");

      return targetUser.name;
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      } else {
        throw new SystemError(`failed to get user's name: ${error.message}`);
      }
    }); */
};

// NOTE: unused
logic.getPost = (id) => {
  return (async () => {
    let post;

    try {
      post = await data.findPost((post) => post.id === id);
    } catch (error) {
      throw new SystemError(`failed to get post: ${error.message}`);
    }

    if (!post) throw new MatchError("post not found");

    return post;
  })();

  /* return data
    .findPost((post) => post.id === id)
    .catch((error) => {
      throw new SystemError(`failed to get post: ${error.message}`);
    })
    .then((post) => {
      if (!post) throw new MatchError("post not found");

      return post;
    }); */
};

logic.deletePost = (username, id) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("Username is not valid");
  }

  if (!ID_REGEX.test(id)) {
    throw new ContentError("Post ID is not valid");
  }

  return (async () => {
    let user, post;

    try {
      user = await data.findUser((user) => user.username === username);
    } catch {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      post = await data.findPost((post) => post.id === id);
    } catch (error) {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }

    if (!post) {
      throw new MatchError("post not found");
    }

    if (post.author !== username) {
      throw new MatchError("post author does not match user");
    }

    try {
      await data.deletePost((post) => post.id === id);
    } catch (error) {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return data.findPost((post) => post.id === id);
    })
    .then((post) => {
      if (!post) {
        throw new MatchError("post not found");
      }

      if (post.author !== username) {
        throw new MatchError("post author does not match user");
      }
      
      return data.deletePost((post) => post.id === id);
    })
    .catch((error) => {
      if (error instanceof MatchError || error instanceof ContentError) {
        throw error;
      } else {
        throw new SystemError(`failed to delete post: ${error.message}`);
      }
    }); */
};

logic.authenticateUser = (username, password) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("username is not valid");
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("password is not valid");
  }

  return (async () => {
    let user;

    try {
      user = await data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to authenticate user: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    if (user.password !== password) {
      throw new MatchError("wrong password");
    }
  })();

  /* return data
    .findUser((user) => user.username === username)
    .catch((error) => {
      throw new SystemError(`failed to authenticate user: ${error.message}`);
    })
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      if (user.password !== password) {
        throw new MatchError("wrong password");
      }
    }); */
};

export default logic;
