const { Router } = require("express")
const UsersController = require("../controllers/UsersController.js")
const userRoutes = Router()

function myMiddleware(request, response, next) {
    if(!request.body.isAdmin) {
        return response.json({ message: "user unauthorized"})
    }
    next()
}

const userController = new UsersController()

userRoutes.post("/",myMiddleware, userController.create)

module.exports = userRoutes