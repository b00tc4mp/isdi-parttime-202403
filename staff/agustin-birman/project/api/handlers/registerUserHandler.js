import logic from '../logic/index.js'

export default (req, res, next) => {
    const { name, surname, email, username, password, passwordRepeat, userType } = req.body

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat, userType)
            .then(() => res.status(201).send())
            .catch(error => {
                next(error)
            })
    } catch (error) {
        next(error)
    }
}