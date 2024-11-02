import data from '../data/index.js'
import { ContentError, MatchError } from '../errors.js'

const USERNAME_REGEX = /^[\w-]+$/

const ID_REGEX = /^[0-9]+-[0-9]+$/

const deletePost = (username, postId, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!ID_REGEX.test(postId))
        throw new ContentError('postId is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        data.findPost(post => post.id === postId, (error, post) => {
            if (error) {
                callback(error)

                return
            }

            if (!post) {
                callback(new MatchError('post not found'))

                return
            }

            if (post.author !== username) {
                callback(new MatchError('post author does not match user'))

                return
            }

            data.deletePost(post => post.id === postId, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}

export default deletePost