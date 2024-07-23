import './PostList.css'
import { useEffect, useState } from 'react'

import View from '../../../Components/Library/View'

import logic from '../../../logic'
import Post from './Post'

function PostList({ refreshStamp }) {
    console.log('PostList -> render')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('PostList -> useEffect')

        loadPosts()
    }, [refreshStamp])

    const loadPosts = () => {
        try {
            logic.getAllPosts()
                .then(posts => {
                    console.log('PostList -> setPosts')

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

    const handlePostDeleted = () => loadPosts()

    const handlePostLikeToggled = () => loadPosts()

    const handlePostCommented = () => loadPosts()

    return <View tag="section" className="PostList">
        {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} onPostLikeToggled={handlePostLikeToggled} onPostCommented={handlePostCommented} />)}
    </View>
}

export default PostList