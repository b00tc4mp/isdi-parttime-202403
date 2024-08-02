import express from "express"
import routes from "./handlers/index.js"

const jsonBodyParser = express.json({ strict: true, type: "application/json" })

const router = express.Router()

router.post("/users", jsonBodyParser, routes.registerUserHandler)
router.post("/users/auth", jsonBodyParser, routes.authenticateUserHandler)
router.get("/users/:targetUserId", routes.getUserNameHandler)

router.post("/customers", jsonBodyParser, routes.registerCustomHandler)
router.get("/customers", routes.getAllCustomersHandlers)
router.get("/customers/:customerId", routes.getCustomerHandler)

export default router