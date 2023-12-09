const { Router } = require("express")
const userRoutes = require("./user.routes.js")
const routes = Router()

routes.use("/users", userRoutes)

module.exports = routes