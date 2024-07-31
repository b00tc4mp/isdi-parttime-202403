import logic from "../logic/index.js"

export default (req, res, next) => {
    const { name, username, email, password, passwordRepeat } = req.body

    try {
        logic.registerAdmin(name, username, email, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => {
                next(error)
            })
    } catch (error) {
        next(error)
    }
}