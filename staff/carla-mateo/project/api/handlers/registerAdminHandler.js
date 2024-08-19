import logic from "../logic/index.js"

export default (req, res, next) => {
    const { name, username, email, password, passwordRepeat, avatar, family } = req.body

    console.log('register admin')

    try {
        logic.registerAdmin(name, username, email, password, passwordRepeat, avatar, family)
            .then(() => res.status(201).send())
            .catch(error => {
                next(error)
            })
    } catch (error) {
        next(error)
    }
}