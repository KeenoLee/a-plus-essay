import knex, { Knex } from "knex";
import { Server } from "socket.io";
import {
    ChatroomList,
    MessageInput,
    NewMessage,
    NewMessageNotice,
} from "./models";

export class ChatService {
    constructor(private knex: Knex, private io: Server) { }

    async getChatroomListById(userId: number) {

        //1. get only room title
        //2. get last message, time, tutor
        //TODO: unread message, use group by order_id 008R_11055
        let chatroomList: ChatroomList[] = await this.knex
            .select(
                "order.id as order_id",
                "order.title",
                "user.nickname",
                "user.is_tutor",
                "chat_message.sent_by_tutor",
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
            .where('student_id', userId)
            .orWhere('tutor_id', userId)
            .orderBy("chat_message.updated_at", "desc");
        // .where(userId, order.studentId )
        // .where('order.paid_by_student_time', '!=', null)
        console.log(userId);
        console.log('crl:', chatroomList)
        if (chatroomList.length == 0) {
            let newChatroomList = await this.knex
                .select('title', 'id as order_id')
                .from('order')
                .whereNotNull('tutor_id')
                .andWhere('student_id', userId)
            console.log('newchatroom:', newChatroomList)
            return newChatroomList
        } else {
            return chatroomList;
        }
    }
    async getUnReadMessageNotification() {
        // 
        // 
        //     await this.knex.raw(/* SQL */`
        //     Select urm.last_message_id, cm.*
        //         from chat_message as cm
        //         join user_read_message as urm on cm.order_id = urm.order_id
        //         WHERE urm.user_id = ?
        //         AND cm.order_id = 42
        //         AND urm.last_message_id < cm.id
        //         ORDER BY cm.id DESC
        //     `, 59, )
    }
    async getChatRoomMessage() {

    }

    async postMessage(input: MessageInput) {
        console.log('INPUT?: ', input)
        let [{ id }] = await this.knex
            .insert({
                order_id: input.orderId,
                sent_by_tutor: input.senderIsTutor,
                message: input.newMessage,
            })
            .into("chat_message")
            .returning("id");
        console.log('ID?? ', id)
        if (!id) {
            return { success: false }
        }
        return { success: true }
        // let newNoticeFromRoom: NewMessage = {
        //     order_id: id,
        // };
        // //send this id to other's notification
        // this.io.emit("new message", newNoticeFromRoom);
        // return {
        //     order_id: id
        // }
    }

    async getChatroom(input: { userId: number, orderId: number }) {
        console.log(input)
        let order = await this.knex
            .select('id', 'tutor_id', 'student_id', 'title')
            .from('order')
            .where('id', input.orderId).first()
        if (!order) { return { error: 'order not found' }; }
        // let otherUserId = order.tutor_id == input.userId ? order.student_id : order.tutor_id;
        let otherUserId: string

        if (order.tutor_id == input.userId) {
            otherUserId = order.student_id
        } else if (order.student_id == input.userId) {
            otherUserId = order.tutor_id
        } else {
            return { error: 'not room member' }
        }
        let otherUser = await this.knex.select('id', 'nickname', 'is_tutor').from('user').where('id', otherUserId).first()
        if (!otherUser) { return { error: 'cannot find other user, id = ' + otherUserId } }

        let messages = await this.knex
            .select(
                "chat_message.id",
                "sent_by_tutor",
                "chat_message.message",
                "chat_message.updated_at"
                // this.knex.raw('count(*) as unread_message'),
                // this.knex.count('* as unread_message').from('chat_message').innerJoin('user_read_message', 'user_read_message.order_id', '=', 'chat_message.order_id').where('chat_message.id', '=', '52')
            )
            .from("chat_message")
            .where('order_id', input.orderId)
            .orderBy("chat_message.updated_at", "asc");
        // .where(userId, order.studentId )
        // .where('order.paid_by_student_time', '!=', null)
        return { otherUser, messages, order };
    }
}