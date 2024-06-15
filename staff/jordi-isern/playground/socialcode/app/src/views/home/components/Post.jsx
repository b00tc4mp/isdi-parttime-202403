import Image from "../../../Components/Core/Image";
import Heading from "../../../Components/Core/Heading";
import Button from "../../../Components/Core/Button";
import Text from "../../../Components/Core/Text"
import Title from "../../../Components/Core/Title";
import View from "../../../Components/Library/View";
import Time from "../../../Components/Core/Time";

import logic from '../../../logic'

function Post({ post ,onPostDeleted}) {
    console.log('Post -> render')

    const handleDeletePost = postId => {
        if(confirm('Delete Post?')){    
            try{
                logic.deletePost(postId , error => {
                    if(error) {
                        console.log(error)

                        alert(error.message)

                        return
                    }
                    onPostDeleted()
                })
            }catch (error) {
                console.log(error)

                alert(error.message)
            }}
    }

    return <View tag="article" align="">
    <View direction='row'>
        <Text>{post.author}</Text>

        <Heading level="2">{post.title}</Heading>
    </View>

    <Image src={post.image} />

    <Text>{post.description}</Text>

    <View direction='row'>
        <Time>{post.date}</Time>

        {post.author === logic.getLoggedInUsername() && <Button onClick={handleDeletePost}>Delete</Button>}
    </View>
</View>
}

export default Post