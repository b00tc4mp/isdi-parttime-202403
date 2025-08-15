import logic from "./index.js"


//los throws son sicro con lo que lo recogemos con un try-catch  
//de esta manera quitamos trabajo a la capa de data, detectando los errores de forma inmediata si hay algo que esta mal
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
