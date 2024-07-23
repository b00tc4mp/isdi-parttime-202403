import "./Comment.css"

import Heading from "../../../Components/Core/Heading";
import View from "../../../Components/Library/View";

function Comment ({comment}){
    console.log('Comment ->  render')
    const {author , comment:text} = comment


    return <View tag="article" align="" className={'comment '}>
        <Heading level='3'>{author}</Heading>
        <p>{text}</p>
    </View>
}

export default Comment