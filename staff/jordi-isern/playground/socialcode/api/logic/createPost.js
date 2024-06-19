import validate from 'com/validate.js'
import data from '../data/index.js'
import { ContentError, MatchError } from "com/errors.js"


const createPost = (author, title, image, description, callback) => {
    validate.username(author)
    validate.text(title, 'title', 50)
    validate.url(image,'image')
    validate.text(description,'description', 200)
    
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

