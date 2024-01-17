const { Router } = require("express")
const UsersController = require("../controllers/UsersController.js")
const userRoutes = Router()
const ensureAuthenticated = require("../middleware/ensureAuthenticated.js")
const userController = new UsersController()

userRoutes.post("/", userController.create)
userRoutes.put("/", ensureAuthenticated, userController.update)

module.exports = userRoutes