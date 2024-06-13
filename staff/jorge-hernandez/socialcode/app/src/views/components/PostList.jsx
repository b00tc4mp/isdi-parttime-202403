import { useEffect, useState } from 'react'
import View from '../../components/library/View'
import Post from './Post'

import logic from '../../logic'

function PostList({ refreshStamp }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
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

        setPosts(posts)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handlePostDeleted = () => loadPosts()

  return (
    <View tag='section' className='PostList'>
      {posts.map((post) => (
        <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} />
      ))}
    </View>
  )
}

export default PostList
