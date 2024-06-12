import { useState, useEffect } from "react";

import './PostList.css'
import Post from '../components/Post'
import View from '../../library/View'

import logic from '../../../logic'


function PostList() {
  console.log('PostList -> render')

  const [posts, setPosts] = useState([])

  useEffect(() => {
      console.log('PostList -> useEffect')

      loadPosts()
  }, [])

  const loadPosts = () => {
      try {
          logic.getAllPosts((error, posts) => {
              if (error) {
                  console.error(error)

                  alert(error.message)

                  return
              }

              console.log('PostList -> setPosts')

              setPosts(posts)
          })
      } catch (error) {
          console.error(error)

          alert(error.message)
      }
  }

  const handlePostDeleted = () => loadPosts()


  return <View tag="section" className="PostList">
  {posts.map(post => <Post post={post} onPostDeleted={handlePostDeleted} />)}
</View>
}

export default PostList
