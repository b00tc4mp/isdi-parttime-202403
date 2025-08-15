import data from "./index.js"

/* data.findUser(user => user.username === "RotoJaz", (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
}) */

//insertUser no devuelve nada a no ser que haya un error, por eso solo recibe un solo parametro
/* data.insertUser({ username: "Koala", email: "koala@koala.com", "password": "1234" }, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log("user inserted")
}) */

//filter devuelve varios posts
/* data.findPosts(post => post.date.includes("T11"), (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
}) */

/* data.insertPost({
    author: "Debora",
    title: "Lion Leo",
    image: "https://koalahospital.org.au/cdn/shop/products/f7p40CJBP5hB09Vp6TeSXFwMe0E_lion-leo-adoption-certificate.jpg?v=1608174739&width=600",
    description: "Released  In September 2019",
    date: new Date().toISOString
}, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log("post inserted")
}) */

data.deletePost(post => post.title === "LionLeo", (error) => {
    if (error) {
        console.error(error)

        return
    }

    console.log("post deteled")
})