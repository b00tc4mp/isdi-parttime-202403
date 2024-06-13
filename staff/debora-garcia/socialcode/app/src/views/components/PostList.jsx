import { useState, useEffect } from "react"

import "./PostList.css"

import View from "../../components/library/View"
import Post from "./Post"
import logic from "../../logic"

function PostList({refreshStamp}) {
    console.log("PostList -> render")

    const [posts, setPosts] = useState([])
    //[] no hay posts creados, si solo fuera uno se pondria null

    useEffect(() => {
        console.log("PostList -> useEffect")

        loadPosts()
    }, [refreshStamp])
    

    const loadPosts = () => {
        try {
            logic.getPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                console.log("PostList -> setPosts")

                setPosts(posts)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    //para manejar el onPostDeleted usamos handlePostDeleted que recargara los posts y los repinte
    const handlePostDeleted = () => loadPosts()

    return <View tag="section" className="PostList">
        {posts.map(post => <Post post={post} onPostDeleted={handlePostDeleted} />)}
    </View>
}

export default PostList