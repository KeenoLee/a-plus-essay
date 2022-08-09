import cors from "cors";
import Knex from "knex";
import path from 'path';
import config from "./knexfile";
import socketio from "socket.io";
import express, { Request, Response } from "express";
import http, { request } from "http";

import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";

import { OrderService } from "./services/OrderService";
import { OrderController } from "./controllers/OrderController";

import { ChatController } from "./controllers/ChatController";
import { ChatService } from "./services/ChatService";

import { env } from "./env";
import { getJWTPayload, JWTPayload } from "./utils/get-jwt";

const dirPath = path.join(__dirname, '/uploads')
export const knex = Knex(config[env.NODE_ENV || "development"]);

const app = express();
// But why?
// const userRoutes = express.Router();
const orderRoutes = express.Router();
const chatRoutes = express.Router();

let server = http.createServer(app);
let io = new socketio.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

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
orderRoutes.post('/make-offer', orderController.submitQuotation)
// orderRoutes.get("/order/pending", orderController.getPendingOrder)
orderRoutes.get("/order/matching", orderController.getMatchingOrder)
orderRoutes.get("/order/ongoing", orderController.getOngoingOrder)
orderRoutes.get("/order/completed", orderController.getCompletedOrder)
orderRoutes.get("/get-order-subject/:id", orderController.getOrderImages)
orderRoutes.post('/confirm-tutor', orderController.confirmTutor)
orderRoutes.get('/get-candidates/:orderId', orderController.getCandidates)

// orderRoutes.post('/order/acceptOrRejectQuote', orderController.acceptOrRejectQuotation)

import { userRoutes } from "./router/userRoutes"

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