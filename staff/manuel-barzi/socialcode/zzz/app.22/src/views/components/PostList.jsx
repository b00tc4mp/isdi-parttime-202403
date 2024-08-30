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


    return <View tag="section" className="PostList">
        {posts.map(post => <article>
            <p>{post.author}</p>

            <Heading level="2">{post.title}</Heading>

            <Image src={post.image} />

            <p>{post.description}</p>

            <time>{post.date}</time>

            {/* <button className="Button">Delete</button> */}
        </article>)}
    </View>
}

export default PostList