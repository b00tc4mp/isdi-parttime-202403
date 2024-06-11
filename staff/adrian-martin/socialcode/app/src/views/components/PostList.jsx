import { useState, useEffect } from 'react'

import './PostList.css'

import Image from '../../component/core/Image'
import Heading from '../../component/core/Heading'
import View from '../../component/library/View'

import logic from '../../logic'


function PostList() {
    console.log('PostList -> render')

    const [posts, setPost] = useState([])

    useEffect(() => {
        console.log('PostList -> useEffect')

        try{
            logic.getAllPosts((error, posts) => {
                if(error){
                    console.error(error)

                    alert(error.message)
                    return
                }
                
                setPost(posts)
            })
        }catch(error){
            console.error(error)

            alert(error.message)
        }
    }, [])

    return <View tag='section' className="PostList">
        {posts.map(post => <article>

            <div>{post.user}</div>

            <Heading level='2'>{post.title}</Heading>
            
            <Image src={post.image} />
            
            <p>{post.description}</p>

            <time>{post.date}</time>

            {/* <button className="Button deleteButton">Delete</button> */}
        </article>)}
    </View>
}

export default PostList