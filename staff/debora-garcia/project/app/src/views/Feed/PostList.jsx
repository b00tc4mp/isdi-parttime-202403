import { useEffect, useState } from "react"
import logic from "../../logic"
import "./PostList.css"

import Post from "./Post"
import useContext from "../../useContext"

export default function PostList() {
    console.log("PostList ->render")
    const { alert } = useContext()

    const [posts, setPosts] = useState([])
    useEffect(() => {
        console.log("PostList -> useEffect")

        loadPosts()
    }, [])

    const loadPosts = () => {
        try {
            logic.getPosts()
                .then((posts) => {
                    console.log("PostList -> setPosts")
                    setPosts(posts)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handlePostLikeToggled = () => {
        loadPosts()
    }


    return <div className="PostList">
        <div className="PostList-container">
            {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} />)}
        </div>
    </div>

}