import fs from 'fs'
import errors from "com/errors.js"

const { SystemError } = errors

const data = {}

data.findUser = (condition, callback) => {
  fs.readFile("./data/users.json", "utf8", (error, usersJson) => {

    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!usersJson) { usersJson = "[]" }

    const usersArray = JSON.parse(usersJson)

    const userRegistered = usersArray.find(condition)

    callback(null, userRegistered)
  })
}

data.insertUser = (user, callback) => {

  fs.readFile("./data/users.json", "utf8", (error, usersJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!usersJson) usersJson = "[]"

    const usersArray = JSON.parse(usersJson)

    usersArray.push(user)

    const newJson = JSON.stringify(usersArray)

    fs.writeFile("./data/users.json", newJson, (error) => {

      if (error) {
        callback(new SystemError(error.message))

        return
      }
      callback(null)
    })
  })
}

data.findPosts = (condition, callback) => {

  fs.readFile("./data/posts.json", "utf8", (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!postsJson)
      postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const filtered = posts.filter(condition)

    callback(null, filtered)
  })
}

data.findOnePost = (condition, callback) => {

  fs.readFile("./data/posts.json", "utf8", (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!postsJson)
      postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const postFind = posts.find(condition)

    callback(null, postFind)
  })
}

data.insertPost = (post, callback) => {

  fs.readFile("./data/posts.json", "utf8", (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!postsJson) {
      postsJson = "[]"
    }

    const posts = JSON.parse(postsJson)

    post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

    posts.push(post)

    const newJson = JSON.stringify(posts)

    fs.writeFile("./data/posts.json", newJson, (error) => {

      if (error) {
        callback(new SystemError(error.message))

        return
      }

      callback(null)
    })
  })
}

data.deletePost = (condition, callback) => {

  fs.readFile("./data/posts.json", "utf8", (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const index = posts.findIndex(condition)

    if (index > -1) { //-1 significa que no hay coincidencias
      const deletedPost = posts.splice(index, 1)[0]
      const newJson = JSON.stringify(posts)


      fs.writeFile("./data/posts.json", newJson, (error) => {

        if (error) {
          callback(new SystemError(error.message))

          return
        }
        callback(null, deletedPost)


      })

    } else {
      callback(null) // no hay coincidencias
    }
  })
}

data.toggleLike = (postId, username, callback) => {
  fs.readFile('./data/posts.json', 'utf8', (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message));
      return;
    }

    if (!postsJson) postsJson = '[]';

    const posts = JSON.parse(postsJson);

    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      callback(new MatchError('Post not found'));
      return;
    }

    const selectedPost = posts[postIndex];

    if (!selectedPost.liked) {
      selectedPost.liked = [];
    }

    const userIndex = selectedPost.liked.indexOf(username);
    if (userIndex === -1) {
      selectedPost.liked.push(username);
      selectedPost.likes++
    } else {
      selectedPost.liked.splice(userIndex, 1);
      selectedPost.likes--
    }

    const newJson = JSON.stringify(posts);

    fs.writeFile('./data/posts.json', newJson, (error) => {
      if (error) {
        callback(new SystemError(error.message));
        return;
      }

      callback(null);
    });
  });
};

export default data