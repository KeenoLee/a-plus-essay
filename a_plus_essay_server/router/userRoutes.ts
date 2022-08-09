import express from "express";
import { UserController } from "../controllers/UserController";
import { knex } from "../main";
import { UserService } from "../services/UserService";

export const userRoutes = express.Router();

const userService = new UserService(knex);
const userController = new UserController(userService);

userRoutes.post("/register/student", userController.createUser);
userRoutes.post("/register/tutor", userController.createUser);
userRoutes.post("/login/password", userController.loginWithPassword);
// userRoutes.post("/login/password/:id/:isTutor", userController.loginWithPassword);
userRoutes.post("/checkemailandphone", userController.checkEmailAndPhoneDuplication);
userRoutes.get("/login/google", userController.loginWithGoogle);
userRoutes.get("/login/facebook", userController.loginWithFacebook);
userRoutes.post("/resetpassword", userController.resetPassword);
userRoutes.post("/tutor-file", userController.uploadTutorFile);
userRoutes.post("/edit-profile", userController.editProfile);
userRoutes.get("/login/token", userController.loginWithToken);
userRoutes.get("/get-user-file", userController.getUserImage);
userRoutes.get('/get-tutor/:tutorId', userController.getTutorInfo);
