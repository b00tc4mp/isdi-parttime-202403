const logic = {}

logic.loginUser = (username, password) => {
    const user = data.findUser((user) => {
        return user.username === username
    })
    console.log(username, password, user)
    if(!user){
        throw new MatchError('usern not found')
    }

    if(user.password !== password){
        throw new MatchError('wrong password')
    }

    return (user)
}

logic.isUserLoggedIn = () => {
    return !!sessionStorage.username
}

const NAME_REGEX = /^[a-zA-z]/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_$%&=\[\]\{\}\<\>\(\)]).{8,}$/

logic.registerUser = function(name, username,email, password, passwordRepeat) {
    if(!NAME_REGEX.test(name)){
        throw new ContentError('name is not valid')
    }

    if(!EMAIL_REGEX.test(email)){
        throw new ContentError('email is not valid')
    }

    if(!USERNAME_REGEX.test(username)){
        throw new ContentError('username is not valid')
    }

    if(!PASSWORD_REGEX.test(password)){
        throw new ContentError('Your password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long. needs  ')
    }
    if (password !== passwordRepeat){
        throw new MatchError('passwords dont\'t match')
    }

    let user = data.findUser((user) => {
        return user.email === email || user.username === username
    })
    
    if (user){
        throw new DuplicityError('user already exists')
    }

    user = {
        name: name,
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)
}

logic.logOutUser = () => {delete sessionStorage.username}

logic.getUserName = () => {
    const user = data.findUser((user) =>{
        return  user.username === sessionStorage.username
    })
    return user.name  
} 

logic.getAllPosts = () => {
    const posts = data.findPosts(() => {true})

    return posts
}

logic.createPost = ( title , image, description) => {
    if(typeof title !== 'string' || !title.length || title.length > 50)throw new ContentError('titple is not valid')
    if(typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('image is not valid')
    if(typeof description !== 'string' || !description.length || title.length > 200) throw new ContentError('description is not valid')


    const post = {
        author : sessionStorage.username,
        title,
        image,
        description,
        date: new Date().toISOString()
    } 

    data.insertPost(post)
}