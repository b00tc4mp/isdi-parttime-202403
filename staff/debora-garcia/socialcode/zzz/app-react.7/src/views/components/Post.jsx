import Image from "../../components/core/Image"
import Heading from "../../components/core/Heading"
import Button from "../../components/core/Button"
import Text from "../../components/core/Text"
import Time from "../../components/core/Time"
import View from '../../components/library/View'

import logic from "../../logic"

// post recive dos props, post y un callback que avisa cuando se ha borrado un post, ya que inicialmente se usaba loadPosts, pero esta funcion esta fuera del compo
function Post({ post, onPostDeleted, onPostLikeToggled }) {
    console.log("Post -> render")

    /* const handleDeletePost = postId => {
        try {
            logic.deletePost(postId, error => { 
                ya recibimos el post desde props y por lo taanto su id
    */

    const handleDeletePost = () => {
        try {
            if (confirm("Delete post?"))
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

    const handleToggleLikePost = () => {
        try {
            logic.toggleLikePost(post.id, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                onPostLikeToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    return <View tag="article" align="">
        <View direction="row">
            <Text>{post.author}</Text>

            <Heading level="2">{post.title}</Heading>
        </View>

        <Image src={post.image} />

        <Text>{post.description}</Text>

        <View direction="row">
            <Button onClick={handleToggleLikePost}>{`${post.likes.includes(logic.getLoggedInUsername()) ? '❤️' : '🤍'} ${post.likes.length} like${post.likes.length === 1 ? '' : 's'}`}</Button>
        </View>

        {/*<View style={{ display: "flex", alignItems: "center", gap: "1rem" }}>*/}
        <View direction="row">
            <Time>{post.date}</Time>

            {/*{post.author === logic.getLoggedInUsername() && <button className="Button" onClick={() => handleDeletePost(post.id)}>Delete</button>}
        como y recibimos post desde props en el compo no hace falta usar una funcion callback para pasarle el post.id*/}

            {post.author === logic.getLoggedInUsername() && <Button className="Button" onClick={handleDeletePost}>Delete</Button>}
        </View>

    </View>
}

export default Post