import logic from './index.js'

/*try {
    logic.registerUser('Peter', 'Pan', 'peter@pan.com', 'peterpan', '123123123', '123123123', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user registered')
    })
} catch (error) {
    console.error(error)
} */

/*try {
    logic.authenticateUser('doncic', '123123123', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user authenticated')
    })
} catch (error) {
    console.error(error)
} */

/*try {
    logic.getAllPosts((error, posts) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('posts retrieved', posts)
    })
} catch (error) {
    console.error(error)
} */

/*try {
    logic.createPost('doncic', 'To the Finals', 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Mavs is close to get in the NBA Finals', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('post created')
    })
} catch (error) {
    console.error(error)
} */

try {
    logic.deletePost("doncic", "9241306766906554-1716462206087", error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('post deleted')
    })
} catch (error) {
    console.error(error)
} 