import { useEffect, useState } from 'react'

import Heading from '../../../Components/Core/Heading'
import Image from'../../../Components/Core/Image'
import View from '../../../Components/Library/View'
import Button from '../../../Components/Core/Button'

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
        {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} />)}
    </View>
}

export default PostList