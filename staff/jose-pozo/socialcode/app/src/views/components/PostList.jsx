import { useState, useEffect } from 'react'

import './PostList.css'

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

            alert(error.message)
        }
    }

    const handlePostDeleted = () => loadPosts()

    const handlePostLikeToggled = () => loadPosts()


    return <View tag="section" className="PostList">
        {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} onPostLikeToggled={handlePostLikeToggled} />)}
    </View>
}

export default PostList