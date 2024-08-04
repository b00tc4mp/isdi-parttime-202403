import logic from '../logic/index.js'

export default (req, res, next) => {
    const { name, surname, email, role, manager, password, passwordRepeat } = req.body

    try {
        logic.enrollUser(name, surname, email, role, manager, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}