import express, { json } from "express"
import routes from "./handlers/index.js"

const jsonBodyParser = express.json({ strict: true, type: "application/json" })

const router = express.Router()

router.post("/users", jsonBodyParser, routes.registerUserHandler)
router.post("/users/auth", jsonBodyParser, routes.authenticateUserHandler)
router.get("/users/:targetUserId", routes.getUserNameHandler)

router.patch("/users/:userId/edit", jsonBodyParser, routes.editProfile)

router.post("/customers", jsonBodyParser, routes.registerCustomHandler)
router.get("/customers", routes.getAllCustomersHandlers)
router.get("/users/:targetUserId/profile", routes.getProfileUser)

export default router