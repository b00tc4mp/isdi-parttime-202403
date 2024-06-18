import Image from "../../components/core/Image"
import Heading from '../../components/core/Heading'
import logic from "../../logic"
import Button from "../../components/core/Button"
import Text from "../../components/core/Text"
import Time from "../../components/core/Time"

import './Post.css'
import View from "../../components/library/View"

function Post({ post, onPostDeleted }) {
    console.log('Post -> render')

    const handleDeletePost = postId => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(postId, error => {
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

    return <article className="Post">
        <Text className="AuthorTitle">{post.author}</Text>

        <Heading level='2' className="PostTitle">{post.title}</Heading>

        <Image className="PostImage" src={post.image} />

        <Heading level='4' className="DescriptionTitle">
            Description:
        </Heading>


        <Text className="PostDescription">
            {post.description}</Text>

        <Time>{post.date}</Time>

        {post.author === logic.getLoggedInUsername() && <Button className="DeleteButton" onClick={() => handleDeletePost(post.id)}>Delete</Button>}

    </article>
}

export default Post