import { useState, useEffect } from "react";

import './PostList.css'
import Post from '../components/Post'
import View from '../../library/View'

import logic from '../../../logic'


function PostList({refreshStamp}) {

    const [posts, setPosts] = useState([])
    
  useEffect(() => {

      loadPosts()
  }, [refreshStamp])

  const loadPosts = () => {
      try {
          logic.getAllPosts(posts)
              .then((posts)=> setPosts(posts))
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

    const handlePostDeleted = () => loadPosts()


  return <View tag="section" className="PostList">
  {posts.map(post => <Post key={post.id} post={post} onPostLikeToggled={loadPosts} onPostDeleted={handlePostDeleted} />)}
</View>
}

export default PostList
