import { User, Post } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    //buscamos al usuario
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            //pasamos el string de mongodb (postId)
            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) {
                        throw new NotFoundError('post not found')
                    }
                    //soy yo?(username) el author del post?
                    if (post.author.toString() !== userId) {
                        throw new MatchError('post author does not match user')
                    }

                    return Post.deleteOne({ _id: new ObjectId(postId) })
                        .catch((error) => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deletePost