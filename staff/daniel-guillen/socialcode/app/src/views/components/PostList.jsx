import { useState, useEffect } from 'react'

import View from '../../components/library/View'
import Post from './Post'

import logic from '../../logic'
import useContext from '../../useContext'

function PostList({ refreshStamp }) {
    console.log('PostList -> render')
    const { alert } = useContext()
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

    return <View tag="section" className="PostList">
        {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} onPostLikeToggled={handlePostLikeToggled} />)}
    </View>
}

export default PostList