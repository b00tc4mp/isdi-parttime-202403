import express from "express"
import routes from "./handlers/index.js"

const jsonBodyParser = express.json({ strict: true, type: "application/json" })

const router = express.Router()

router.post("/users", jsonBodyParser, routes.registerUserHandler)
router.post("/users/auth", jsonBodyParser, routes.authenticateUserHandler)
router.get("/users/:targetUserId", routes.getUserNameHandler)

router.patch("/users/:userId/edit", jsonBodyParser, routes.editProfileHandler)

router.post("/customers", jsonBodyParser, routes.registerCustomHandler)
router.get("/customers", routes.getAllCustomersHandler)
router.get("/users/:targetUserId/profile", routes.getProfileUserHandler)

router.get("/delivery-notes", routes.getAllDeliveryNotesHandler)

export default router