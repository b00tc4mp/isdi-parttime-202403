import { useEffect, useState } from "react"
import "./PostList.css"

import Post from "./Post"
import View from "../../components/library/View"

import logic from "../../logic"

function PostList({ refreshStamp }) {
  console.log("PostList -> render")

  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log("PostList -> useEffect")

    loadPosts()
  }, [refreshStamp])

  const loadPosts = () => {
    try {
      logic.getAllPosts((error, posts) => {
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

  const handlePostDeletePost = () => loadPosts()

  return (
    <View tag="section" className="PostList">
      {posts.map((post) => (
        <Post key={post.id} post={post} onPostDeleted={handlePostDeletePost} />
      ))}
    </View>
  )
}

export default PostList
