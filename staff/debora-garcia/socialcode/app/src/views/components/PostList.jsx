import { useState, useEffect } from "react"

//import "./PostList.css"

import View from "../../components/library/View"
import Post from "./Post"
import logic from "../../logic"

function PostList({ refreshStamp }) {
    console.log("PostList -> render")

    const [posts, setPosts] = useState([])
    //[] no hay posts creados, si solo fuera uno se pondria null

    useEffect(() => {
        console.log("PostList -> useEffect")

        loadPosts()
    }, [refreshStamp])


    const loadPosts = () => {
        try {
            logic.getPosts()
                .then(posts => {
                    console.log("PostList -> setPosts")

                    setPosts(posts)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)

                    return

                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    //para manejar el onPostDeleted usamos handlePostDeleted que recargara los posts y los repinte
    const handlePostDeleted = () => loadPosts()

    const handlePostLikeToggled = () => loadPosts()

    // usamos key como identificador para react ya que al devolver un array, en caso de que un post cambiara, se repintaria unicamente el post modificado.
    return <View tag="section" className="PostList">
        {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} onPostLikeToggled={handlePostLikeToggled} />)}
    </View>
}

export default PostList