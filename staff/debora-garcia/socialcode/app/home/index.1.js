if (!logic.isUserLoggedIn())// si no ha hecho login no te deje acceder al juego
    location.href = "../login"

const view = new Component(document.body)
view.addClass("View")

const header = new Component("header")
header.addClass("Header")

const userName = logic.getUserName()

const userNameTitle = new Heading(3)
userNameTitle.setText(userName)

header.add(userNameTitle)

//añadimos todo al header
view.add(header)


const logoutButton = new Button
logoutButton.setText("Logout")
logoutButton.addClass("logoutButton")

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = "../login"
})

header.add(logoutButton)

const main = new Component("main")
view.add(main)

const postList = new Component("section")
main.add(postList)


/* INYECTAMOS MANUALMENTE LOS POSTS PARA PODER ELIMINARLO DEL CODIGO.

    localStorage.posts = JSON.stringify([{

        author: "Roto Jaz",
        title: "Adopt me",
        image: "https://img.freepik.com/premium-vector/kawaii-cute-vector-koala-cartoon-style-drawing-illustration_945253-50.jpg?w=360",
        text: "Can you imagine Australia without our iconic Koalas? No, we don’t want to either. However, we are now at a critical point in their survival. Koala numbers continue to decline due to habitat loss, disease, road strikes and dog attacks. The Black Summer Bushfires has now pushed this already threatened species to the brink of extinction."

    },
    {
        author: "Shelly Beach",
        title: "Adopt me",
        image: "https://img.freepik.com/premium-vector/kawaii-cute-vector-koala-cartoon-style-drawing-illustration_945253-50.jpg?w=360",
        text: "Can you imagine Australia without our iconic Koalas? No, we don’t want to either. However, we are now at a critical point in their survival. Koala numbers continue to decline due to habitat loss, disease, road strikes and dog attacks. The Black Summer Bushfires has now pushed this already threatened species to the brink of extinction."


    }
    ])

localStorage.posts
JSON.parse(localStorage.posts)
 */

  const posts = JSON.parse(localStorage.posts) //QUIK DEMO para proba si inyecta los posts
//const posts =logic.getPosts()

posts.forEach(post => {
    const newPost = new Post(post)
    postList.add(newPost)

})  

/* {
    const postData = {
        author: "Roto Jaz",
        title: "Adopt me",
        image: "https://img.freepik.com/premium-vector/kawaii-cute-vector-koala-cartoon-style-drawing-illustration_945253-50.jpg?w=360",
        text: "Can you imagine Australia without our iconic Koalas? No, we don’t want to either. However, we are now at a critical point in their survival. Koala numbers continue to decline due to habitat loss, disease, road strikes and dog attacks. The Black Summer Bushfires has now pushed this already threatened species to the brink of extinction."
    }

    const post = new Post(postData)

    postList.add(post)

}


{
    const postData = {
        author: "Shelly Beach",
        title: "Adopt me",
        image: "https://img.freepik.com/premium-vector/kawaii-cute-vector-koala-cartoon-style-drawing-illustration_945253-50.jpg?w=360",
        text: "Can you imagine Australia without our iconic Koalas? No, we don’t want to either. However, we are now at a critical point in their survival. Koala numbers continue to decline due to habitat loss, disease, road strikes and dog attacks. The Black Summer Bushfires has now pushed this already threatened species to the brink of extinction."
    }

    const post = new Post(postData)

    postList.add(post)
}  */

const footer = new Component("footer")
footer.addClass("Footer")

const addPostButton = new Button
addPostButton.setText("+")
addPostButton.addClass("PostButton")



footer.add(addPostButton)
view.add(footer)



