import Image from "../../components/core/Image"
import Heading from '../../components/core/Heading'

function Post({ post, onPostDeleted }) {
    console.log('Post -> render')

    const handleDeletePost = postId => {
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
        <p className="AuthorTitle">{post.author}</p>
        <Heading level='2' className="PostTitle">{post.title}</Heading>
        <Image className="PostImage" src={post.image} />
        <Heading level='4' className="DescriptionTitle">
            Description:
        </Heading>
        <p className="PostDescription">
            {post.description}</p>
        <time>{post.date}</time>
        {post.author === logic.getLoggedInUsername() && <button className="Button" onClick={() => handleDeletePost(post.id)}>Delete</button>}
    </article>
}

export default Post