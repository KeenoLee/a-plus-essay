import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";
import { RestController } from "./RestController";

export class ChatController extends RestController {
    constructor(private chatService: ChatService) {
        super();
        this.chatService = chatService;
    }

    getChatList = async (req: Request, res: Response) => {
        console.log("Getting chat list....");
        let json = await this.chatService.getChatroomListById();
        res.json(json);
        return;
    };
}
