import express, { Request, Response } from "express";
import socketio from "socket.io";
import http from "http";
import cors from "cors";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { OrderService } from "./services/OrderService";
import { OrderController } from "./controllers/OrderController";
import Knex from "knex";
import config from "./knexfile";
import { ChatController } from "./controllers/ChatController";
import { ChatService } from "./services/ChatService";

export const knex = Knex(config[process.env.NODE_ENV || "development"]);
const userService = new UserService(knex);
const userController = new UserController(userService);
const orderService = new OrderService(knex);
const orderController = new OrderController(orderService);

const app = express();
const userRoutes = express.Router();
const orderRoutes = express.Router();
const chatRoutes = express.Router();

let server = http.createServer(app);
let io = new socketio.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const chatService = new ChatService(knex, io);
const chatController = new ChatController(chatService);
// app.use(cors({ 'production' }))

io.on("connection", (socket) => {
    console.log("socket.io is connected");
    socket.on("chat message", (msg) => {
        console.log("chat message:", msg);
        io.emit("chat message", msg);
    });
});

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(userRoutes);
app.use(orderRoutes);
app.use(chatRoutes);

userRoutes.post("/register/student", userController.createUser);
userRoutes.post("/register/tutor", userController.createUser);
userRoutes.post("/login/password", userController.loginWithPassword);
userRoutes.post(
    "/checkemailandphone",
    userController.checkEmailAndPhoneDuplication
);
// userRoutes.get("/login/google", userController.loginWithGoogle);
userRoutes.get("/login/facebook", userController.loginWithFacebook);
userRoutes.post("/resetpassword", userController.resetPassword);

chatRoutes.get("/chat/list", chatController.getChatList);

async function testing() {
    let chats = await chatService.getChatroomListById(); //use 53 if input ID
    console.log(chats);
}
// testing().catch(e => console.error(e)).finally(() => knex.destroy())

orderRoutes.get("/order/data", orderController.getOrderData);
// userRoutes.post("/order-submission", orderController.createOrder)

const PORT = 8111;

server.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
