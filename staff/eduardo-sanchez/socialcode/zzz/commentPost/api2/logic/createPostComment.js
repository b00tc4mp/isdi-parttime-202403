// import { User, Post } from '../data/index.js'
// import { NotFoundError, SystemError } from 'com/errors.js'
// import validate from 'com/validate.js'

// const createPostComment = (postId, userId, text) => {
//     validate.id(postId, 'postId')
//     validate.id(userId, 'userId')
//     validate.string(text, 'comment', 130)

//     return User.findById(userId).lean()
//         .catch(error => { throw new SystemError(error.message) })
//         .then(user => {
//             if (!user) throw new NotFoundError('user not found')


//             return Post.findById(postId).lean()
//                 .catch(error => { throw new SystemError(error.message) })
//                 .then(post => {
//                     if (!post) throw new NotFoundError('post not found')

//                     const textComment = {
//                         author: userId,
//                         text: text,
//                         date: new Date()
//                     }


//                     return Post.findByIdAndUpdate((postId), { $push: { comments: textComment } })
//                         .catch(() => { throw new SystemError(error.message) })
//                         .then(() => { })
//                 })
//         })
// }
// export default createPostComment
