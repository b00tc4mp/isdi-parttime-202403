//LOGIC

import data from '../data/index.js'
import { ContentError, DuplicityError, MatchError } from "../error.js"

const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/



logic.registerUser = ( name, surname, email, username, password, passwordRepeat, callback) => {
    if (!NAME_REGEX.test(name)){
        throw new ContentError('name is not valid')
    }
    if (!NAME_REGEX.test(surname)){
        throw new ContentError('surname is not valid')
    }
    if (!EMAIL_REGEX.test(email)){
        throw new ContentError('email is not valid')
    }
    if (!USERNAME_REGEX.test(username)){
        throw new ContentError('username is not valid')
    }
    if (!PASSWORD_REGEX.test(password)){
        throw new ContentError('password is not valid')
    }
    if (!PASSWORD_REGEX.test(passwordRepeat)){
        throw new ContentError('passwords don\'t match')
    }

    data.findUser(user => user.mail === email || user.username === username, (error, user) =>{
        if (error) {
            callback(error)

            return
        }

        if(user) {
            callback (new DuplicityError('user already exists'))

            return
        }

        const newUser = {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password
        }

        data.insertUser(newUser, error => {
            if (error){
                callback(error)
                
                return
            }
            callback(null)
        })
    })
}


logic.getAllPost = (callback) =>{
    data.findPosts(()=> true, (error , posts) => {
        if (error){
            callback(error)

            return
        }
        callback(null, posts)
    })

}

logic.createPost = (author, title, image, description) => {
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('title is not valid')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('image is not valid')
    if (typeof description !== 'string' || !description.length || description.length > 200) throw new ContentError('description is not valid')
   // if (!data.findUser(user => user.author === author,(error, user)=> {if(error){callback(error); return} callback(null, user)})) throw new ContentError ('user not found')


    const newPost = {
        author: author,
        title: title,
        image: image,
        description
    }
    data.insertPost(newPost, (error) =>{
        if (error){
            callback(error)

            return
        }
        callback(null)
    })
}


export default logic

