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
import { getJWTPayload, JWTPayload } from "./utils/get-jwt";
import { env } from "./env";

const dirPath = path.join(__dirname, '/uploads')
export const knex = Knex(config[env.NODE_ENV || "development"]);

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

const userService = new UserService(knex);
const userController = new UserController(userService);
const orderService = new OrderService(knex, io);
const orderController = new OrderController(orderService);

const chatService = new ChatService(knex, io);
const chatController = new ChatController(chatService, io);
// app.use(cors({ 'production' }))

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use('/get-image', express.static(__dirname + '/uploads'))
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
userRoutes.get("/get-user-file", userController.getUserImage);

chatRoutes.get("/chat/list", chatController.getChatList);
chatRoutes.get("/chat/:id/message", chatController.getChatroom);
chatRoutes.post("/chat/:id/message", chatController.postMessage);



// async function testing() {
//     let chats = await chatService.getChatroomListById(); //use 53 if input ID
//     console.log(chats);
// }
// testing().catch(e => console.error(e)).finally(() => knex.destroy())

orderRoutes.get("/order/data", orderController.getOrderData);
orderRoutes.post("/order-submission", orderController.createOrder)
orderRoutes.post("/order-file", orderController.uploadOrderFile)
orderRoutes.post('/order/candidateQuote', orderController.submitQuotation)

orderRoutes.get("/order/pending", orderController.getPendingOrder)
orderRoutes.post("/order/completed", orderController.completeOrder)
// orderRoutes.get("/order/matching", orderController.getMatchingOrder)
// orderRoutes.get("/order/ongoing", orderController.getOngoingOrder)
// orderRoutes.get("/order/completed", orderController.getCompletedOrder)

orderRoutes.post('/order/acceptOrRejectQuote', orderController.acceptOrRejectQuotation)

app.use(userRoutes);
app.use(orderRoutes);
app.use(chatRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'routes not found, method: ' + req.method + ' url: ' + req.url })
})


const PORT = 8111;

server.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});