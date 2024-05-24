const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/ //  /^[\w-]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

    logic.registerUser = (name, surname, email, username, password, passwordRepeat ) => {
        if(!NAME_REGEX.test(name))
            throw new ContentError('name is not valid')

        if(!NAME_REGEX.test(surname))
            throw new ContentError('name is not valid')

        if(!EMAIL_REGEX.test(email)) 
            throw new ContentError('email is not valid')

        if(!USERNAME_REGEX.test(username)) 
            throw new ContentError('username is not valid')

        if(!PASSWORD_REGEX.test(password)) 
            throw new ContentError('password is not valid')

        if(password !== passwordRepeat) 
            throw new MatchError('password don\'t match')

        let user = data.findUser(function (user) {
            return user.email === email || user.username === username
        })
    
        if(user)  
            throw new DuplicityError('user already exists')
    
        user = {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password
        }

        data.insertUser(user)
    
    }

    logic.loginUser = (username, password) => {
        if(!USERNAME_REGEX.test(username))
            throw new ContentError('username is not valid')
        

        if(!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')

        let user = data.findUser(user => {
            return user.username === username
        })

        if(!user)
            throw new MatchError('user not found')

        if(user.password !== password)
            throw new MatchError('wrong password')

        sessionStorage.username = username
    }

    logic.isUserLoggedIn = () => { !!sessionStorage.username }

    logic.logoutUser = () => {
        delete sessionStorage.username
    }

    logic.getUsername = () => {
        const user = data.findUser(user => user.username === sessionStorage.username)
    
        return user.name
    }

    logic.getAllPosts = () => {
        const posts = data.findPosts( () => {return true})

        return posts.reverse()
    }

    logic.createPost = (title, image, description)  => {
        if(typeof title !== 'string' || !title.length || title.length > 30) throw new ContentError('title is not valid')
        if(typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('image is not valid')
        if(typeof description !== 'string' || !description.length || description.length > 200) throw new ContentError('description is not valid')

        const post = {
            author: sessionStorage.username,
            title,
            image,
            description,
            date: new Date().toISOString()
        }

        data.insertPost(post)
    }

    logic.getLoggedInUsername = () => sessionStorage.username

    logic.deletePost = id => data.deletePost(post => post.id === id)
    

