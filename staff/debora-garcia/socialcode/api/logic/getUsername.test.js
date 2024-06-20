try {
    logic.getUsername("RotoJaz", "RotoJaz", (error, username) => {
        if (error) {
            console.error(error)
            return
        }
        console.log("username retrieved", username)
    })
} catch (error) {
    console.error(error)
}