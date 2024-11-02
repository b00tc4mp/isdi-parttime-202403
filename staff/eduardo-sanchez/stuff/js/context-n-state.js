var logic = {
    __loggedIn__: false
}

logic.loginUser = function (username, password) {
    if (username === 'pepito' && password === 'grillo')
        this.__loggedIn__ = true
    else throw new Error('wrong credentials')
}

logic.isUserLoggedIn = function () {
    return this.__loggedIn__
}

logic.logoutUser = function () {
    this.__loggedIn__ = false
}


logic.loginUser('pepito', 'grillo')

console.log(logic.isUserLoggedIn())

logic.logoutUser()

console.log(logic.isUserLoggedIn())


// VM631: 22 true
// VM631: 26 false