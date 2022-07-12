import express, { Request, Response } from 'express'
import { UserService } from './services/UserService'
import { UserController } from './controllers/UserController'
import { OrderService } from './services/OrderService'
import { OrderController } from './controllers/OrderController'
import Knex from "knex";
import config from "./knexfile"

export const knex = Knex(config[process.env.NODE_ENV || "development"]);
const userService = new UserService(knex);
const userController = new UserController(userService);
const orderService = new OrderService(knex);
const orderController = new OrderController(orderService);


const app = express();
const userRoutes = express.Router();
const orderRoutes = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.json({ message: 'hello world' })
})

app.use(userRoutes)
app.use(orderRoutes)

// userRoutes.post("/signup/student", userController.createStudent);
// userRoutes.post("/signup/tutor", userController.createTutor);
// userRoutes.post("/login/password", userController.loginPassword);
// userRoutes.get("/login/google", userController.loginGoogle);
// userRoutes.get("/login/facebook", userController.loginFacebook);
// userRoutes.post("/logout", logout);

orderRoutes.get("/order/data", orderController.getOrderData)

const PORT = 8111

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})