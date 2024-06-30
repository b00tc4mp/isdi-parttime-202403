import Heading from "../../../Components/Core/Heading";
import Text from "../../../Components/Core/Text";
import View from "../../../Components/Library/View";

function Comment ({comment}){
    console.log('Comment ->  render')
    const {username , comment:text} = comment

    return <View tag="article" align="">
        <Heading level='3'>{username}</Heading>
        <p>{text}</p>
    </View>
}

export default Comment