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

dotenv.config({ path: "../.env" });


export interface JWTPayload {
    id: number
    nickname: string
    is_tutor: Boolean
}

dotenv.config()


export class ChatController extends RestController {
    constructor(private chatService: ChatService) {
        super();
        this.chatService = chatService;
    }
    // getUserId = async (req: Request, res: Response) => {
    //     try {
    //         if (!req.body.username || !req.body.password) {
    //             res.status(401).json({ msg: "Wrong Username/Password" });
    //             return;
    //         }
    //         const {username,password} = req.body;
    //         const user = (await this.userService.getUser(username))[0];
    //         if(!user || !(await checkPassword(password,user.password))){
    //             res.status(401).json({msg:"Wrong Username/Password"});
    //             return;
    //         }
    //         const payload = {
    //             id: user.id,
    //             username: user.username,
    //             is_tutor: user.is_tutor
    //         };
    //         const token = jwtSimple.encode(payload, process.env.jwtSecret!);
    //         res.json({
    //             token: token
    //         });
    //         } catch (error) {
    //             console.log(error)
    //             res.status(500).json({msg: String(error)})
    //         }
    //     }

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
            console.error('orderControllerError: ', error)
            res.status(500).json({ error: String(error) })
        }
    };

    postMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { senderIsTutor, orderId, newMessage } = req.body
            const result = await this.chatService.postMessage({ senderIsTutor, orderId, newMessage })
            if (result.success) {
                res.json(result)
                return
            }

        } catch (err) {
            console.error('orderControllerError: ', err)
            res.status(500).json({ error: String(err) })
            return
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
            console.error('orderControllerError: ', err)
            res.status(500).json({ error: String(err) })
        }
    }
}
