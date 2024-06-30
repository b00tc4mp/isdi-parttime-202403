import errors from 'com/errors'
import validate from 'com/validate'

const toggleLikePost = (postId, callback) => {
    validate.id(postId, 'postId')
    validate.callback(callback)

    const xhr = new XM
}