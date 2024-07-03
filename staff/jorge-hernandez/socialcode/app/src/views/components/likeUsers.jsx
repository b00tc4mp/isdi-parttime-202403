import View from '../../components/library/View/'
import './likeUsers.css'

function likeUsers({ children }) {
  return (
    <View tag='section' className='LikesList'>
      {children}
    </View>
  )
}

export default likeUsers
