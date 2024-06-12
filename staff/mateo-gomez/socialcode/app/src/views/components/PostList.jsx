import './PostList.css'
import './Post.css'

import Image from "../../components/core/Image"
import Heading from '../../components/core/Heading'
import View from "../../components/library/View"

import logic from '../../logic'
import { useEffect, useState } from 'react'

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

                setPosts(posts)
            })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    return <View tag="section" className='PostList'>

        {posts.map(post => <article className="Post">
            <p className="AuthorTitle">{post.author}</p>
            <Heading level='2' className="PostTitle">{post.title}</Heading>
            <Image className="PostImage" src={post.image} />
            <Heading level='4' className="DescriptionTitle">
                Description:
            </Heading>
            <p className="PostDescription">
                {post.description}</p>
            <time>{post.date}</time>
            <button className="Button">Delete</button>
        </article>

        )}


    </View>

}

export default PostList