import { User, Ad } from '../data/index.js'
import { SystemError, NotFoundError, MatchError } from 'com/errors.js'
import validate from 'com/validate.js'
// import { Types } from 'mongoose'

// const { ObjectId } = Types

const deleteAdComment = (userId, adId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(adId, 'adId')
    validate.id(commentId, 'commentId')

    return Ad.findById(adId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(ad => {
            if (!ad) {
                throw new NotFoundError('ad not found')
            }

            
            const isCommentOwner = ad.adcomments.some(adcomment => adcomment.author.toString() === userId && adcomment._id.toString() === commentId)
            
            if (!isCommentOwner) {
                throw new MatchError('comment author does not match user & cannot be deleted')
            }
            
            return Ad.findByIdAndUpdate(adId, { $pull: { adcomments: { _id: commentId } } }).lean()
            .catch(error => { throw new SystemError(error.message) })
            .then(ad => {

                   return ad
                        
                    })
                })
            }
            
export default deleteAdComment
            

            // console.log('Ad found:', ad)
            // console.log('Looking for comment:', commentId)
// console.log('User trying to delete:', userId)
            
  // const isCommentOwner = ad.adcomments.some(adcomment => {
                //     console.log('Comparing:', adcomment.author.toString(), userId, adcomment._id.toString(), commentId)
                //     return adcomment.author.toString() === userId && adcomment._id.toString() === commentId
            // })
            
            // console.log('Is comment owner:', isCommentOwner)
            
            // if (!isCommentOwner) {
                //     throw new MatchError('comment author does not match user & cannot be deleted')
            // }