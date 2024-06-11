import { useEffect, useState } from "react";

import './PostList.css'

import Image from '../../components/core/Image'
import Heading from "../../components/core/Heading"
import View from "../../components/library/View"

import postLogic from '../../postLogic'

function PostList() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            postLogic.getAllPosts((error, posts) => {
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
    }, [])

    return <View tag='section' className='PostList'>
        {posts.map(post => <article className='Article' key={post.id}>
            <p>{post.author}</p>

            <Heading level='2'>{post.title}</Heading>

            <Image src={post.image} />

            <p>{post.description}</p>

            <time>{post.date}</time>

        </article>)}
    </View>
}

export default PostList