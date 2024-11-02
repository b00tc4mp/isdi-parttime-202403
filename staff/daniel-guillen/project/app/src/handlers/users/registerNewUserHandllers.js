import createNewUser from '../../logic/users/createNewUser'
import validate from 'com/validate/validateUsers'

export const handleRegisterSubmit = async (event, valueAccess, setMessage, setLevel, token, navigate) => {
    event.preventDefault()

    const form = event.target
    const username = form.username.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value
        // Realizar las validaciones
    try{
        validate.username(username)
        validate.password(password)
        validate.passwordRepeat(password, passwordRepeat)
        validate.access(valueAccess)
                    
        // Crear el objeto si las validaciones son exitosas
        const newDataUser = {
            username: username,
            password: password,
            access: valueAccess
        }
        // Enviar datos al servidor        
        await createNewUser(newDataUser, token)        
        // Mostrar mensaje de éxito
        setMessage('✍️ Registro completado! 🎉')
        setLevel('success')
        // redireccionamos
        setTimeout(() => {
            navigate('/Admin/users')
        }, 2000)
    } catch (error) {
        setMessage(error.message) // Mostrar error en el feedback del formulario
        setLevel('error')
    }
}

export const handleAccessChange = (newAccessLevel, setValueAccess) => {
    setValueAccess(newAccessLevel)
}
