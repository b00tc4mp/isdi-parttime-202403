import logic from '../logic/index.js'


const registerUserHandler = (req, res, next) => {
    const { name, surname, email, phone, password, repeatPassword } = req.body

    try {
        logic.registerUser(name, surname, email, phone, password, repeatPassword)
            .then(() => res.status(201).send())
            .catch(error => {
                next(error, res)
            })
    } catch (error) {
        next(error, res)
    }
}

export default registerUserHandler