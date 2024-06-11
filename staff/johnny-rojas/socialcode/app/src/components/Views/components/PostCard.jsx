import Image from '../../core/Image'
import Heading from '../../core/Heading'
import View from '../../library/View'

function PostCard({ name, onClick, children }) {
  
  return <View tag="section" className="PostsList">
  {posts.map(post => <article>
    
    <p>{post.user}</p>

    <Heading level="2">{post.title}</Heading>

    <Image src={post.image} />

    <p>{post.description}</p>

    <time>{post.date}</time>

    {/* <button classNeme="Button">Delete</button> */}

  </article>)}
</View>
}

export default PostCard