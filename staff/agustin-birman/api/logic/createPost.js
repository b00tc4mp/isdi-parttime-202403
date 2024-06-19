import validate from 'com/validate.js'
import data from '../data/index.js'
import { MatchError } from 'com/errors.js'

const createPost = (username, title, image, description, callback) => {
    validate.username(username)
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)
    validate.callback(callback)

    //No entendi la razon de esta parde del codigo, ya que el usuario ya existe, pero manu lo hizo asi para comprobar el usuario
    data.findUser(user => user.username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        const newPost = {
            author: username,
            title,
            image,
            description,
            date: new Date()
        }

        data.insertPost(newPost, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}
export default createPost