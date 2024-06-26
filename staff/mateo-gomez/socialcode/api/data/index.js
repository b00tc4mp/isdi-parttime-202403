import fs from 'fs'
import { SystemError } from 'com/errors.js'

const data = {}

data.findUser = (condition, callback) => {
    fs.readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }


        if (!json) json = '[]'

        const users = JSON.parse(json)

        const user = users.find(condition)

        callback(null, user)
    })



}


data.insertUser = (user, callback) => {
    fs.readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = '[]'

        const users = JSON.parse(json)

        users.push(user)

        const newJson = JSON.stringify(users)

        fs.writeFile('./data/users.json', newJson, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            callback(null)
        })
    })

}

data.findPosts = (condition, callback) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }


        if (!json) json = '[]'

        const posts = JSON.parse(json)

        const post = posts.filter(condition)

        callback(null, post)
    })
}

data.findPost = (condition, callback) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = '[]'

        const posts = JSON.parse(json)

        const post = posts.find(condition)

        callback(null, post)
    })
}

data.insertPost = (post, callback) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }



        const posts = JSON.parse(json)

        post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

        posts.push(post)

        const newJson = JSON.stringify(posts)

        fs.writeFile('./data/posts.json', newJson, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            callback(null)
        })
    })


}
data.deletePost = (condition, callback) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }



        const posts = JSON.parse(json)

        const index = posts.findIndex(condition)

        if (index > -1) {
            posts.splice(index, 1)

            const newJson = JSON.stringify(posts)

            fs.writeFile('./data/posts.json', newJson, error => {
                if (error) {
                    callback(new SystemError(error.message))

                    return
                }

                callback(null)
            })

        } else callback(null)

    })

}


data.toggleLike = (postId, username, callback) => {
    fs.readFile('./data/posts.json', 'utf8', (error, postsJson) => {
        if (error) {
            callback(new SystemError(error.message));
            return
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
                callback(new SystemError(error.message))
                return
            }

            callback(null)
        })
    })
}

export default data