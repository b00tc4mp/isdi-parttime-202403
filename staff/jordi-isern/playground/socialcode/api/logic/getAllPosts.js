

import data from '../data/index.js'


const getAllPosts = (username, callback) => {
    data.findUser(user = user.username === username, (error , user) => {
        if(error){
            callback(error)

            return
        }

        if(!user){
            callback(new MatchError('usern not found'))

            return
        }
        
        data.findPosts(() => true, (error, posts) => {
            if (error) {
                callback(error)

                return
            }
            callback(null, posts.reverse())
        })
    })

}


export default getAllPosts
