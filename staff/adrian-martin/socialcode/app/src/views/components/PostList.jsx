import { useState, useEffect } from 'react'

import './PostList.css'

import View from '../../component/library/View'
import logic from '../../logic'
import Post from './Post'


function PostList({ refreshStamp }) {
    console.log('PostList -> render')

    const [posts, setPost] = useState([])

    useEffect(() => {
        console.log('PostList -> useEffect')

        loadPost()
    }, [refreshStamp])

    const loadPost = () => {
        try {
            logic.getAllPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)
                    return
                }

                setPost(posts)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeletePost = () => loadPost()

    const handlePostLikeToggled = () => loadPost()

    return <View tag='section' className="PostList">
        {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handleDeletePost} onPostLikeToggled={handlePostLikeToggled}/>
        )}
    </View>
}

export default PostList

