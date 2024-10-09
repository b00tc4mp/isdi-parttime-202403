import createNewUser from '../logic/users/createNewUser'
import { validateUserRegistration } from 'com/validate/validateCreateUser'

export const handleRegisterSubmit = async (event, valueAccess, setMessage, setLevel, token, navigate) => {
    event.preventDefault()

    const form = event.target
    const username = form.username.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value

    try {    
        // Validación de los datos del usuario
        validateUserRegistration(username, password, passwordRepeat, valueAccess) 
                    
        // Crear nuevo usuario
        await createNewUser(username, password, valueAccess, token)
        
        // Mostrar mensaje de éxito
        setMessage('✍️ Registro completado! 🎉')
        setLevel('success') // 'success' aplica el estilo verde
        
        // redireccionamos
        setTimeout(() => {
            navigate('/Admin/users')
        }, 2000)
    } catch (error) {
        console.error(error)
        setMessage(error.message) // Mostrar error en el feedback del formulario
        setLevel('error')
    }
}

export const handleAccessChange = (newAccessLevel, setValueAccess) => {
    setValueAccess(newAccessLevel)
}
