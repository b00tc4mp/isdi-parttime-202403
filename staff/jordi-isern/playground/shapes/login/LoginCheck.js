var LoginCheck = function(){
    loginForm.onSubmit(function(event){
        event.preventDefault()
        var usersJson = localStorage.users
        var users = JSON.parse(usersJson)
        var userInput = loginForm.getUsername()
        var condicion = function(element) { 
            if(element.username === userInput){
                return true
            }else {
                return false
            }}
        console.log(users.find(condicion))
    
    })
}