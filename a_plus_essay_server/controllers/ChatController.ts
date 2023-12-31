import { ChatService } from "../services/ChatService";
import { RestController } from "./RestController";
import express from "express"
import { Request, Response, NextFunction } from "express";
import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import dotenv from "dotenv";
import { getJWTPayload } from "../utils/get-jwt";
import { request } from "http";
import { resolveSoa } from "dns";
import { Server } from "socket.io";
import { env } from "../env";


export interface JWTPayload {
    id: number
    nickname: string
    is_tutor: Boolean
}

dotenv.config()


export class ChatController extends RestController {
    constructor(private chatService: ChatService, private io: Server) {
        super();
        // this.chatService = chatService; private
        this.setupSocket()
    }
    setupSocket() {
        this.io.on('connection', socket => {
            let user_id = 0
            socket.on('login', token => {
                user_id = jwtSimple.decode(token, env.JWT_SECRET)
            })
            socket.on('logout', token => {
                user_id = 0
            })
            socket.on('join', async (order_id) => {
                // console.log('hi', await this.chatService.checkMember({ user_id, order_id }))
                // if () {
                console.log('hi how are you order_id:', order_id)
                socket.join('room:' + order_id)
                // }
            })
            socket.on('leave', (order_id) => {
                socket.leave('room:' + order_id)
            })



        })
    }


    // await this.knex
    // let newNoticeFromRoom: NewMessage = {
    //     order_id: id,
    // };
    // //send this id to other's notification
    // this.io.emit("new message", newNoticeFromRoom);
    // return {
    //     order_id: id
    // }
    getChatList = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Getting chat list....");
        try {
            let payload = getJWTPayload(req)
            console.log(payload)
            let rooms = await this.chatService.getChatroomListById(payload.id);
            res.json({ rooms });
            console.log(rooms)
            return;

        } catch (error) {
            console.error('ChatControllerError: ', error)
            res.status(500).json({ error: String(error) })
        }
    };

    postMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { message } = req.body
            console.log('mssmggmsg', message)
            let payload = getJWTPayload(req)
            let order_id = +req.params.id
            const result = await this.chatService.postMessage({ sender_id: payload.id, order_id, message })
            this.io.to('room:' + order_id).emit('chat message', result)
            console.log('hi see result', result)
            console.log('orrrrderid', order_id)
            res.json({ ok: true })
        } catch (err) {
            console.error('ChatControllerError: ', err)
            res.status(500).json({ error: String(err) })
        }
        // return this.chatService.sendMessage(
        //     order_id: req.params.order_id,
        //     )
    };

    getChatroom = async (req: Request, res: Response) => {

        try {
            let payload = getJWTPayload(req)
            let userId = payload.id
            const orderId = +req.params.id
            const room = await
                this.chatService.getChatroom({ userId, orderId })
            res.json({ room })
        } catch (err) {
            console.error('ChatControllerError: ', err)
            res.status(500).json({ error: String(err) })
        }
    }
}
