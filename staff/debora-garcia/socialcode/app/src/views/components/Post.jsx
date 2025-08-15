import Image from "../../components/core/Image"
import Heading from "../../components/core/Heading"
import Button from "../../components/core/Button"
import Text from "../../components/core/Text"
import Time from "../../components/core/Time"
import View from '../../components/library/View'
import Confirm from "./Confirm"

import logic from "../../logic"
import { useState } from 'react'


// post recive dos props, post y un callback que avisa cuando se ha borrado un post, ya que inicialmente se usaba loadPosts, pero esta funcion esta fuera del compo
function Post({ post, onPostDeleted, onPostLikeToggled }) {
    console.log("Post -> render")

    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

    const handleDeletePost = () => setConfirmDeleteVisible(true)

    /*  const handleToggleLikePost = () => {
         try {
             if (confirm("Delete post?"))
                 logic.deletePost(post.id)
                     .then(() => onPostDeleted())
                     .catch(error => {
                         console.error(error)
 
                         alert(error.message)
                     })
         } catch (error) {
             console.error(error)
 
             alert(error.message)
         }
     } */

    const handleToggleLikePost = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeletePostAccepted = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeletePostCancelled = () => setConfirmDeleteVisible(false)

    return <View tag="article" align="">
        <View direction="row">
            <Heading level="2">{post.title}</Heading>
            <Text>{post.author.username}</Text>
        </View>

        <section className="Post-footer">
            <Image src={post.image} />
            <View direction="row">
                <Time>{post.date}</Time>
                {post.author.id === logic.getUserId() && <Button className="Button-delete" onClick={handleDeletePost}>Delete</Button>}
            </View>
            <View direction="row">
                <Button className="Button-like" onClick={handleToggleLikePost}>{`${post.likes.includes(logic.getUserId()) ? '❤️' : '🤍'} ${post.likes.length} like${post.likes.length === 1 ? '' : 's'}`}</Button>
            </View>
            <Text className="description">{post.description}</Text>
            {/*<View style={{ display: "flex", alignItems: "center", gap: "1rem" }}>*/}
            {confirmDeleteVisible && <Confirm message="Delete post?" onAccept={handleDeletePostAccepted} onCancel={handleDeletePostCancelled} />}
        </section>

    </View>
}

export default Post