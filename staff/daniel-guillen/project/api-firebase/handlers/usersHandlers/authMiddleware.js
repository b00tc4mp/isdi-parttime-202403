import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        req.user = decoded // Guardamos los datos decodificados del usuario
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido o expirado' })
    }
}

export default authMiddleware


// router.get('/protected-route', authMiddleware, (req, res) => {
//     res.json({ message: 'Ruta protegida', user: req.user })
// })
