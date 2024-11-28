import data from './index.js'

/*data.findUser(user => user.surname === 'Edwards', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
})*/

/*data.insertUser({ name: "Anthony", surname: "Edwards", email: "anthony@edwards.es", username: "Ant", password: "123123123", passwordRepeat: "123123123" }, error => {
    if (error) {
        console.error(error)
    }
    console.log("user inserted")
})*/

/*data.findPosts(post => post.date.includes('T11'), (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
})*/

/*data.insertPost({
    author: "Ant",
    title: "Finals",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzFzMWpvMms5ZXNocXR2bTlzNmFxYnF1dnl4bTZ3dnkwdWNyd3MweCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xwVoIQsPhkXh8NUp5E/giphy.gif",
    description: "Wolves",
    date: new Date().toISOString()
}, error => {
    if (error) {
        console.error(error)

        return
    }
    console.log("post inserted")
})*/

data.deletePost(post => post.title === 'Finals', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})