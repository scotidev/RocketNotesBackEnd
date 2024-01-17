const { Router } = require("express")

const userRoutes = require("./user.routes.js")
const notesRoutes = require("./notes.routes.js")
const tagsRoutes = require("./tags.routes.js")
const sessionsRoutes = require("./sessions.routes.js")
const routes = Router()

routes.use("/users", userRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes