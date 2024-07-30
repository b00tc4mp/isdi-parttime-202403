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
    logic
      .getAllPosts()
      .then((posts) => {
        setPosts(posts)
      })
      .catch((error) => {
        console.error(error)
        alert(error.message)
      })
  }

  const handlePostDeleted = () => loadPosts()
  const handlePostToggled = () => loadPosts()

  return (
    <View tag='section' className='PostList'>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onPostDeleted={handlePostDeleted}
          onPostLikeToggled={handlePostToggled}
        />
      ))}
    </View>
  )
}

export default PostList
