import Image from "../../components/core/Image"
import Heading from "../../components/core/Heading"

import logic from "../../logic"

// post recive dos props, post y un callback que avisa cuando se ha borrado un post, ya que inicialmente se usaba loadPosts, pero esta funcion esta fuera del compo
function Post({ post, onPostDeleted }) {
    console.log("Post -> render")

    /* const handleDeletePost = postId => {
        try {
            logic.deletePost(postId, error => { 
                ya recibimos el post desde props y por lo taanto su id
    */

    const handleDeletePost = () => {
        try {
            logic.deletePost(post.id, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                //loadPosts()
                onPostDeleted()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article>
        <p>{post.author}</p>

        <Heading level="2">{post.title}</Heading>

        <Image src={post.image} />

        <p>{post.description}</p>

        <time>{post.date}</time>

        {/*{post.author === logic.getLoggedInUsername() && <button className="Button" onClick={() => handleDeletePost(post.id)}>Delete</button>}
        como y recibimos post desde props en el compo no hace falta usar una funcion callback para pasarle el post.id*/}

        {post.author === logic.getLoggedInUsername() && <button className="Button" onClick={handleDeletePost}>Delete</button>}
    </article>
}

export default Post