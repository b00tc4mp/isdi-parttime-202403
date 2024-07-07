import { useEffect, useState } from "react"

import Heading from "../../components/core/Heading"
import Text from "../../components/core/Text"
import Image from "../../components/core/Image"
import Button from "../../components/core/Button"
import Time from "../../components/core/Time"

import logic from "../../logic"

import './Post.css'

function Post({ post, onPostDeleted }) {
    console.log('Post -> render')

    const [like, setLike] = useState(false)
    const [likeNum, setLikeNum] = useState(0)

    useEffect(() => {
        setLike(includeUserLike())
        setLikeNum(post.liked ? post.liked.length : 0)
    }, [])

    const includeUserLike = () => {
        const username = logic.getUserId()
        return Array.isArray(post.liked) && post.liked.includes(username)
    }

    const handleDeletePost = () => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(post.id, error => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    onPostDeleted()
                })

            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    const handleLike = () => {
        logic.toggleLike(post.id, (error) => {
            if (error) {
                console.error(error)
                return
            }

            if (like) {
                setLike(false)
                setLikeNum(likeNum - 1)
            } else {
                setLike(true)
                setLikeNum(likeNum + 1)
            }
        })
    }


    return <article className="Post">
        <Text className="AuthorTitle">{post.author.username}</Text>

        <Heading level='2' className="PostTitle">{post.title}</Heading>

        <Image className="PostImage" src={post.image} />



        <div>
            <Time>{post.date}</Time>
            <i className={`Likes ${like ? "fa-solid fa-heart" : "fa-regular fa-heart"}`} onClick={handleLike}>
                <sub>{likeNum}</sub>
            </i>
        </div>

        <div>
            <Heading level='4' className="DescriptionTitle">
                Description:
            </Heading>


            <Text className="PostDescription">
                {post.description}</Text>

        </div>

        {post.author.id === logic.getUserId() && <Button className="DeleteButton" onClick={handleDeletePost}>Delete</Button>}

    </article>
}


export default Post