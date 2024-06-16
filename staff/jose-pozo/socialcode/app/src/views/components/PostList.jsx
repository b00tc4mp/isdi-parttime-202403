import './PostList.css'

import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import View from '../../components/library/View'
import Post from './Post'

import logic from '../../logic'

import { useState, useEffect } from 'react'

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

        const handlePostDeleted = () => loadPosts()

        return <View tag='section' className='PostList'>
            {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} />)}
        </View>
    }
}






export default PostList