import logic from "./index.js"


//los throws son sicro con lo que lo recogemos con un try-catch  
//de esta manera quitamos trabajo a la capa de data, detectando los errores de forma inmediata si hay algo que esta mal
/* try {
    logic.registerUser("debora@gmail.com", "Debi", "1234", "1234", error => {
        if (error) {
            console.error(error)
            return
        }
        console.log("user registered")
    })
} catch (error) {
    console.error(error)
} */

/* try {
    logic.authenticateUser("Debi", "1234", error => {
        if (error) {
            console.error(error)
            return
        }
        console.log("user authenticated")
    })
} catch (error) {
    console.error(error)
} */


/* try {
    logic.getPosts((error, posts) => {
        if (error) {
            console.error(error)
            return
        }
        console.log("posts retrieved", posts)
    })
} catch (error) {
    console.error(error)
} */


try {
    logic.createPost("RotoJaz", "koala", "https://koalahospital.org.au/cdn/shop/products/f7p40CJBP5hB09Vp6TeSXFwMe0E_lion-leo-adoption-certificate.jpg?v=1608174739&width=600", "bla bla", error => {
        if (error) {
            console.error(error)
            return
        }
        console.log("post created")
    })
} catch (error) {
    console.error(error)
}
