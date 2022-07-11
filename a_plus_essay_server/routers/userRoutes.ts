import express from 'express';
import { UserService } from '../services/UserService'
import { UserController } from '../controllers/UserController'
import { knex } from "../main";

const userService = new UserService(knex);
const userController = new UserController(userService);

export const userRoutes = express.Router();

// userRoutes.post("/signup/student", userController.createStudent);
// userRoutes.post("/signup/tutor", userController.createTutor);
// userRoutes.post("/login/password", userController.loginPassword);
// userRoutes.get("/login/google", userController.loginGoogle);
// userRoutes.get("/login/facebook", userController.loginFacebook);
// userRoutes.post("/logout", logout);
