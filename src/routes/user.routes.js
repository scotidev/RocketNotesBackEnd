import { Router } from "express";
import multer from "multer";
import { uploadConfig } from "../configs/upload.js";

import { UsersController } from "../controllers/UsersController.js";
import { UserAvatarController } from "../controllers/UserAvatarController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

export const userRoutes = Router();

const upload = multer(uploadConfig.MULTER);

const userController = new UsersController();
const userAvatarController = new UserAvatarController();

userRoutes.post("/", userController.create);

userRoutes.put("/", ensureAuthenticated, userController.update);

userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  (request, response) => {
    userAvatarController.update(request, response);
    console.log(request.file.filename);
    return response.json({
      message: "Avatar uploaded successfully",
      filename: request.file.filename,
    });
  }
);
