//LOGIC

import data from '../data/index.js'
import { ContentError, MatchError } from "../error.js"


const USERNAME_REGEX = /^[\w-]+$/


const createPost = (author, title, image, description, callback) => {
    if(!USERNAME_REGEX.test(author))throw new ContentError('username is not valid')
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('title is not valid')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('image is not valid')
    if (typeof description !== 'string' || !description.length || description.length > 200) throw new ContentError('description is not valid')
    
    data.findUser(user => user.username === author,(error, user)=> {
            if(error){
                callback(error); 
                return
            } 
            if(!user){
                callback(new MatchError('User not found'))

                return 
            }

        const newPost = {
            author: author,
            title: title,
            image: image,
            description
        }
        data.insertPost(newPost, (error) => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
        })
    })
}


export default createPost

