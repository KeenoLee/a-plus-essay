import { sensitiveHeaders } from "http2";
import knex, { Knex } from "knex";
import { Server } from "socket.io";
import {
    ChatroomList,
    MessageInput,
    NewMessage,
    NewMessageNotice,
} from "./models";

export class ChatService {
    constructor(private knex: Knex, private io: Server) {}

    async getChatroomListById() {
        //TODO: unread message, use group by order_id 008R_11055
        let chatroomList: ChatroomList[] = await this.knex
            .select(
                "order.id as chatroom_id",
                "order.title",
                "user.nickname",
                "user.is_tutor",
                "chat_message.message as last_message",
                "chat_message.updated_at as last_message_time"
                // this.knex.raw('count(*) as unread_message'),
                // this.knex.count('* as unread_message').from('chat_message').innerJoin('user_read_message', 'user_read_message.order_id', '=', 'chat_message.order_id').where('chat_message.id', '=', '52')
            )
            .from("order")
            .innerJoin("chat_message", "chat_message.order_id", "order.id")
            .innerJoin(
                "user_read_message",
                "user_read_message.last_message_id",
                "chat_message.id"
            )
            .innerJoin("user", "user.id", "user_read_message.user_id")
            // .where('student_id', userId)
            .orderBy("chat_message.updated_at", "desc");
        // .where(userId, order.studentId )
        // .where('order.paid_by_student_time', '!=', null)
        return chatroomList;
    }
    async getUnReadMessageNotification() {
        //if getting unread message =>
    }

    async sendMessage(input: MessageInput) {
        let [{ id }] = await this.knex
            .insert({
                order_id: input.order_id,
                sent_by_tutor: input.sent_by_tutor,
                message: input.message,
            })
            .into("chat_message")
            .returning("id");
        let newNoticeFromRoom: NewMessage = {
            order_id: id,
        };
        this.io.emit("new message", newNoticeFromRoom);
    }
}
