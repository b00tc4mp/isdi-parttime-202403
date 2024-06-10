import { useEffect } from 'react'

import Heading from '../../../Components/Core/Heading'
import Image from'../../../Components/Core/Image'
import View from '../../../Components/Library/View'
import Button from '../../../Components/Core/Button'

import logic from '../../../logic'

function PostList(){
    console.log('PostList -> render')

    useEffect(() =>{
        console.log('PostList -> userEffect')

        const [posts, setPosts] = setPosts('')

        try {
            logic.getAllPosts((error, posts) => {
                if(error) {
                    console.log(error)
                    alert(error.message)
                    return
                }
                setPosts(posts)

            })
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    })

    return <View tag='section' className ='postList'>
        {posts.map(post =><article>
            <p>peterpan</p>

            <Heading level='2'>I love cors</Heading>

            <Image class='Image' src= 'https://marketing4ecommerce.net/wp-content/uploads/2024/02/imagen-generada-con-nightcafe-e1708680739301.jpg'></Image>

            <p>top top</p>
            <time></time>

            <Button> Delete</Button>
        </article>)}
    </View>
}

export default PostList