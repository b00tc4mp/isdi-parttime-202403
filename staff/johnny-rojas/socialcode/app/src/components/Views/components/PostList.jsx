import { useState, useEffect } from "react";

import './PostList.css'

import Image from '../../core/Image'
import Heading from '../../core/Heading'
import View from '../../library/View'

import logic from '../../../logic'

function PostList() {

  const [posts, setPosts] = useState([])

  useEffect(() => {

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
  }, [])

  return <View tag="section" className="PostsList">
    {posts.map(post => <article>
      
      <p className="Author">{post.user}</p>

      <Heading level="2">{post.title}</Heading>

      <Image src={post.image} />

      <p>{post.description}</p>

      <time>{post.date}</time>

    </article>)}
  </View>
}

export default PostList
