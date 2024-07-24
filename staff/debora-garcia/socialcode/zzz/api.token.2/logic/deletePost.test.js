try {
    logic.deletePost("RotoJaz", "45055983651437126-1717177280798", error => {
        if (error) {
            console.error(error)
            return
        }
        console.log("post deleted")
    })
} catch (error) {
    console.error(error)
}

//TODO modificar id post