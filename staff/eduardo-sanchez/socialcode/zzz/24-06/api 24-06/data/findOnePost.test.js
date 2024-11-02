import data from './index.js'

data.findOnePost(post => post.date.includes('T15'), (error, post) => {
    if (error) {
        console.error(error)

        return
    }

    if (!post) {
        console.error("Post not found");
    } else {
        console.log(post);
    }
})
