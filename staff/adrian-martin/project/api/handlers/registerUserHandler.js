import logic from '../logic/index.js'

export default (req, res, next) => {
    try {
        const { name, username, email, password } = req.body

        logic.registerUser(name, username, email, password)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}