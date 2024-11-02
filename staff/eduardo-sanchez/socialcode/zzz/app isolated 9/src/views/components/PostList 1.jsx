import { useState, useEffect } from 'react'

import './PostList.css'

import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import View from '../../components/library/View'

import logic from '../../logic'

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

    const handleDeletePost = postId => {
        try {
            logic.deletePost(postId, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                loadPosts()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <View tag="section" className="PostList">
        {posts.map(post => <article>
            <p>{post.author}</p>

            <Heading level="2">{post.title}</Heading>

            <Image src={post.image} />

            <p>{post.description}</p>

            <time>{post.date}</time>

            {post.author === logic.getLoggedInUsername() && <button className="Button" onClick={() => handleDeletePost(post.id)}>Delete</button>}
        </article>)}
    </View>
}

export default PostList
