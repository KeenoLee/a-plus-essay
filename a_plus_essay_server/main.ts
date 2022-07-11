import express, { Request, Response } from 'express'
import { UserService } from './services/UserService'
import { UserController } from './controllers/UserController'
import Knex from "knex";
import config from "./knexfile"

export const knex = Knex(config[process.env.NODE_ENV || "development"]);
const userService = new UserService(knex);
const userController = new UserController(userService);

const app = express();
const userRoutes = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.json({ message: 'hello world' })
})

// userRoutes.post("/signup/student", userController.createStudent);
// userRoutes.post("/signup/tutor", userController.createTutor);
// userRoutes.post("/login/password", userController.loginPassword);
// userRoutes.get("/login/google", userController.loginGoogle);
// userRoutes.get("/login/facebook", userController.loginFacebook);
// userRoutes.post("/logout", logout);

const port = 8111

app.listen(port, () => {
    console.log(`Listening to ${port}`)
})