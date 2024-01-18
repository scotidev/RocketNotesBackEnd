const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload.js")
const upload = multer(uploadConfig.MULTER)
const UsersController = require("../controllers/UsersController.js")
const userRoutes = Router()
const ensureAuthenticated = require("../middleware/ensureAuthenticated.js")
const userController = new UsersController()

userRoutes.post("/", userController.create)
userRoutes.put("/", ensureAuthenticated, userController.update)
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (request, response) => {
    console.log(request.file.filename)
})

module.exports = userRoutes