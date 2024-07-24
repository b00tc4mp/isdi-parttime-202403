try {
    logic.createPost("RotoJaz", "Test", (error, username) => {
        if (error) {
            console.error(error)
            return
        }
        console.log("post Created", username)
    })
} catch (error) {
    console.error(error)
}