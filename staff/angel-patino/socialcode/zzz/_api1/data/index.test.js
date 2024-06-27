import data from './index.js'

data.deletePost(post => post.title === 'smile 2', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})