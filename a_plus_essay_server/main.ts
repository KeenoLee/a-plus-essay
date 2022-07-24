import express, { Request, Response } from "express";
import socketio from "socket.io";
import http, { request } from "http";
import cors from "cors";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { OrderService } from "./services/OrderService";
import { OrderController } from "./controllers/OrderController";
import Knex from "knex";
import config from "./knexfile";
import { ChatController } from "./controllers/ChatController";
import { ChatService } from "./services/ChatService";
import path from 'path';

const dirPath = path.join(__dirname, '/uploads')
export const knex = Knex(config[process.env.NODE_ENV || "development"]);

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

io.on("connection", (socket) => {
    console.log("socket.io is connected");
    socket.on("chat message", (msg) => {
        console.log("chat message:", msg);
        io.emit("chat message", msg);
    });
});

const userService = new UserService(knex);
const userController = new UserController(userService);
const orderService = new OrderService(knex, io);
const orderController = new OrderController(orderService);

const chatService = new ChatService(knex, io);
const chatController = new ChatController(chatService);
// app.use(cors({ 'production' }))

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

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

chatRoutes.get("/chat/list", chatController.getChatList);
chatRoutes.get("/chat/:id/message", chatController.getChatroom);


// async function testing() {
    //     let chats = await chatService.getChatroomListById(); //use 53 if input ID
    //     console.log(chats);
    // }
    // testing().catch(e => console.error(e)).finally(() => knex.destroy())
    
    orderRoutes.get("/order/data", orderController.getOrderData);
    orderRoutes.post("/order-submission", orderController.createOrder)
    orderRoutes.post("/order-file", orderController.uploadOrderFile)
    
    app.use(userRoutes);
    app.use(orderRoutes);
    app.use(chatRoutes);
    
    app.use((req, res) => {
        res.status(404).json({ error: 'routes not found, method: ' + req.method + ' url: ' + req.url })
    })
    
    app.use(express.static('./uploads'))
    
    const PORT = 8111;
    
    server.listen(PORT, () => {
        console.log(`Listening to ${PORT}`);
    });
    