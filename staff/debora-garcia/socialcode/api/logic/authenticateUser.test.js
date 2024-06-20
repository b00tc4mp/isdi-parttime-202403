try {
    logic.authenticateUser("Debi", "1234", error => {
        if (error) {
            console.error(error)
            return
        }
        console.log("user authenticated")
    })
} catch (error) {
    console.error(error)
}