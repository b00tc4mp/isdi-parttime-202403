try {
    logic.registerUser("debora@gmail.com", "Debi", "1234", "1234", error => {
        if (error) {
            console.error(error)
            return
        }
        console.log("user registered")
    })
} catch (error) {
    console.error(error)
}