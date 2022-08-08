import knex, { Knex } from "knex";
import { Server } from "socket.io";
import { FlowFlags } from "typescript";
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
                "chat_message.sender_id",
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
        console.log('ChatroomListDetail:', chatroomList)
        if (chatroomList.length == 0) {
            let newChatroomList = await this.knex
                .select('title', 'id as order_id')
                .from('order')
                .whereRaw(`(tutor_id = ? or student_id = ?) and tutor_id IS NOT NULL`, [userId, userId])
            console.log('ChatRoomListWithOnlyTitle:', newChatroomList)
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

    async checkMember(input: { order_id: number, user_id: number }, knex = this.knex) {
        let order = await knex.select('id', 'student_id', 'tutor_id')
            .from('order').where('id', input.order_id).first()
        console.log('ooooooorder', order, input)
        return order?.student_id == input.user_id || order?.tutor_id == input.user_id

    }

    async postMessage(input: MessageInput) {

        console.log('INPUT?: ', input)
        //1. update chat_message
        //2. update user_read_message
        return this.knex.transaction(async knex => {
            if (!await this.checkMember({ order_id: input.order_id, user_id: input.sender_id })) {
                throw new Error('Not a room member')
            }

            console.log('checking inputttttttt', input)

            let [{ id, updated_at }] = await knex
                .insert(input)
                .into("chat_message")
                .returning(["id", "updated_at"])

            if ((await knex('user_read_message').select('*').where('order_id', input.order_id)).length === 0) {
                await knex
                    .insert({ last_message_id: id, order_id: input.order_id, user_id: input.sender_id })
                    .into(('user_read_message'))
                    .returning('last_message_id')
            } 
            else {
                await knex('user_read_message')
                    .whereRaw('order_id = ?', input.order_id)
                    .update({ last_message_id: id, user_id: input.sender_id })
                    .returning('last_message_id')
            }

            await knex
                .select('id')
                .from('user_read_message')
                .where({ order_id: input.order_id })

            return { id, updated_at, sender_id: input.sender_id, message: input.message }
        })
    }

    async getChatroom(input: { userId: number, orderId: number }) {
        console.log(input)

        let order = await this.knex
            .select('id', 'tutor_id', 'student_id', 'title')
            .from('order')
            .where('id', input.orderId).first()

        if (!order) { 
            return { 
                error: 'order not found'
            };
        }

        // let otherUserId = order.tutor_id == input.userId ? order.student_id : order.tutor_id;
        let otherUserId: string

        if (order.tutor_id == input.userId) {
            otherUserId = order.student_id
        } 
        else if (order.student_id == input.userId) {
            otherUserId = order.tutor_id
        } 
        else {
            return { error: 'not room member' }
        }

        let otherUser = await this.knex
            .select('id', 'nickname', 'is_tutor')
            .from('user')
            .where('id', otherUserId)
            .first()

        if (!otherUser) { 
            return { 
                error: 'cannot find other user, id = ' + otherUserId
            }
        }

        let messages = await this.knex
            .select(
                "chat_message.id",
                "sender_id",
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